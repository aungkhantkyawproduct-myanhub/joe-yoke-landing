'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // State for Light/Dark Mode toggle
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Initialize the scroll reveal animations and WebGL Shader
  useEffect(() => {
    // Reveal Animation
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-5');
            }
        });
    }, { threshold: 0.1 });
    reveals.forEach(el => observer.observe(el));

    // WebGL Shader Background
    const canvas = document.getElementById('shader-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    
    function syncSize() {
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }
    
    if (typeof ResizeObserver !== 'undefined') {
      new ResizeObserver(syncSize).observe(canvas);
    }
    syncSize();
    
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    if (!gl) return;
    
    const vs = `attribute vec2 a_position; varying vec2 v_texCoord; void main() { v_texCoord = a_position * 0.5 + 0.5; gl_Position = vec4(a_position, 0.0, 1.0); }`;
    const fs = `precision highp float; varying vec2 v_texCoord; uniform float u_time; void main() {
        vec2 uv = v_texCoord;
        vec2 center = vec2(0.5, 0.5);
        float d = length(uv - center);
        
        // Base Neutral Color from Design System (#0B192C)
        vec3 color = vec3(0.043, 0.098, 0.173); 
        
        float wave1 = sin(uv.x * 3.0 + u_time * 0.2) * 0.1;
        float wave2 = cos(uv.y * 2.5 - u_time * 0.3) * 0.1;
        
        // Primary Neon Green/Yellow (#CCFF00) and Cyan (#00F0FF)
        vec3 neonPrimary = vec3(0.8, 1.0, 0.0); 
        vec3 neonCyan = vec3(0.0, 0.94, 1.0);      
        
        float mask1 = smoothstep(0.4, 0.0, length(uv - vec2(0.2 + wave1, 0.3 + wave2)));
        float mask2 = smoothstep(0.5, 0.0, length(uv - vec2(0.8 - wave2, 0.7 + wave1)));
        
        color = mix(color, neonPrimary, mask1 * 0.3);
        color = mix(color, neonCyan, mask2 * 0.2);
        
        float noise = fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453);
        color += noise * 0.02;
        
        gl_FragColor = vec4(color, 1.0);
    }`;
    
    function cs(type: number, src: string) {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }
    
    const prog = gl.createProgram()!;
    gl.attachShader(prog, cs(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, cs(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    
    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
    
    const uTime = gl.getUniformLocation(prog, 'u_time');
    
    let animationFrameId: number;
    function render(t: number) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, t * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }
    render(0);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <main className={`transition-colors duration-300 font-sans selection:bg-[#CCFF00]/30 min-h-screen overflow-x-hidden pt-[72px] ${isDarkMode ? 'bg-[#0B192C] text-white' : 'bg-gray-50 text-[#0B192C]'}`}>
        
        {/* Global Styles specific to this design */}
        <style dangerouslySetInnerHTML={{__html: `
          .glass-panel { background: ${isDarkMode ? 'rgba(45, 52, 73, 0.4)' : 'rgba(255, 255, 255, 0.8)'}; backdrop-filter: blur(24px); border-top: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}; border-left: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); }
          .glow-primary { box-shadow: 0 0 30px rgba(204, 255, 0, 0.2); }
          .animate-float { animation: float 6s ease-in-out infinite; }
          @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
          .reveal { transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        `}} />

        {/* TopNavBar */}
        <nav className={`fixed top-0 w-full z-50 backdrop-blur-xl border-b shadow-[0_8px_32px_0_rgba(0,0,0,0.1)] transition-colors duration-300 ${isDarkMode ? 'bg-[#0B192C]/60 border-white/10' : 'bg-white/80 border-gray-200'}`}>
          <div className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
            
            {/* Logo and Brand Name */}
            <div className="flex items-center gap-3 cursor-pointer active:scale-95 duration-200">
              <img src="/logo-nav.jpg" alt="Joe Yoke Logo" className={`h-10 w-10 object-contain rounded-lg ${!isDarkMode && 'invert'}`} />
              <span className="font-extrabold text-[24px] md:text-[32px] tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#FF9F0A]">
                JOE YOKE
              </span>
            </div>
            
            <div className="hidden md:flex gap-8 items-center">
              <a className={`text-[16px] font-bold border-b-2 pb-1 cursor-pointer transition-colors ${isDarkMode ? 'text-[#CCFF00] border-[#CCFF00]' : 'text-[#8DB300] border-[#8DB300]'}`} href="#">Games</a>
              <a className={`text-[16px] font-bold transition-colors cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`} href="#">Community</a>
              <a className={`text-[16px] font-bold transition-colors cursor-pointer ${isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-black'}`} href="#">Download App</a>
              
              {/* Theme Toggle Button */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`flex items-center p-2 rounded-full transition-colors cursor-pointer active:scale-95 duration-200 ${isDarkMode ? 'text-gray-300 hover:text-[#CCFF00] hover:bg-white/5' : 'text-gray-600 hover:text-[#8DB300] hover:bg-black/5'}`} 
                title="Toggle Light/Dark Mode"
              >
                <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
          {/* Only show the WebGL canvas in dark mode for contrast */}
          <div className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${isDarkMode ? 'opacity-60' : 'opacity-10'}`} style={{ display: 'block' }}>
            <canvas id="shader-canvas" style={{ display: 'block', width: '100%', height: '100%' }}></canvas>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8 reveal opacity-0 translate-y-5">
              <h1 className="text-[48px] md:text-[72px] font-extrabold leading-tight tracking-tight">
                Play Together.<br />
                <span className="text-[#00F0FF]">Laugh Together.</span>
              </h1>
              <p className={`text-[18px] max-w-lg mx-auto lg:mx-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                One app. Endless games. Infinite fun. Experience the world's most social gaming platform designed for groups, families, and friends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-[#CCFF00] text-[#0B192C] rounded-xl font-bold text-[18px] hover:scale-105 hover:shadow-[0_0_30px_rgba(204,255,0,0.4)] transition-all active:scale-95">
                  Download App
                </button>
                <button className={`px-8 py-4 glass-panel rounded-xl font-bold text-[18px] transition-all active:scale-95 ${isDarkMode ? 'text-white hover:bg-white/10' : 'text-[#0B192C] hover:bg-black/5'}`}>
                  Explore Games
                </button>
              </div>
            </div>
            
            <div className="relative flex justify-center items-center reveal opacity-0 translate-y-5" style={{ transitionDelay: '200ms' }}>
              {/* Floating Icons Background */}
              <div className="absolute inset-0 z-0 overflow-visible">
                <span className="material-symbols-outlined text-[#CCFF00] text-6xl absolute top-10 left-10 animate-float" style={{ animationDelay: '0s' }}>joystick</span>
                <span className="material-symbols-outlined text-[#FF9F0A] text-7xl absolute bottom-20 right-10 animate-float" style={{ animationDelay: '1s' }}>casino</span>
                <span className="material-symbols-outlined text-[#00F0FF] text-5xl absolute top-1/2 left-0 animate-float" style={{ animationDelay: '2s' }}>playing_cards</span>
                <span className="material-symbols-outlined text-[#FF9F0A] text-6xl absolute bottom-0 left-1/4 animate-float" style={{ animationDelay: '3s' }}>emoji_events</span>
              </div>
              <div className={`relative glass-panel rounded-[40px] p-4 border glow-primary z-10 ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`}>
                <img className="w-[280px] h-[560px] object-cover rounded-[32px] shadow-2xl" alt="Mobile App Interface" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBi7n4UEHLoMlpjKqiZoXj19WbH7_mx7BQSQCc8YfTBWPx-dkGLfjqyFZC9ORGb7DpvfoycEAT4heB5v6-kkA07RHN5GELvJOPDRxiwOsIAmJtKo-4t61F54nzfxnAYWY6Ygnfsj5xsa2XxR0H4U-dxPjWMeP2iNBAaIQYcUOFYfJx59CypscHuSuBJpjteFfgGE5jbTi6deci1QRA2B8zua_yujokIO7ussRhTXXMRkqHh2N5SmY543S-9eAAQwfEVfr6QmZemmOE" />
              </div>
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <section className={`py-12 border-y ${isDarkMode ? 'bg-[#060e20]/50 border-white/5' : 'bg-gray-100/50 border-gray-200'}`}>
          <div className="max-w-7xl mx-auto px-12">
            <p className="text-center text-xs text-gray-500 mb-8 uppercase tracking-widest font-bold">Trusted By</p>
            <div className={`flex flex-wrap justify-center items-center gap-12 transition-all ${isDarkMode ? 'opacity-50 grayscale hover:grayscale-0' : 'opacity-70 grayscale hover:grayscale-0'}`}>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
                <span className="text-[20px] font-bold">App Store</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_books</span>
                <span className="text-[20px] font-bold">Google Play</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <div className={`w-10 h-10 rounded-full border-2 bg-[#FF9F0A] ${isDarkMode ? 'border-[#0B192C]' : 'border-white'}`}></div>
                  <div className={`w-10 h-10 rounded-full border-2 bg-[#CCFF00] ${isDarkMode ? 'border-[#0B192C]' : 'border-white'}`}></div>
                  <div className={`w-10 h-10 rounded-full border-2 bg-[#00F0FF] ${isDarkMode ? 'border-[#0B192C]' : 'border-white'}`}></div>
                </div>
                <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-[#0B192C]'}`}>20M+ Active Players</span>
              </div>
            </div>
          </div>
        </section>

        {/* Game Categories */}
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
          <h2 className="text-[32px] md:text-[40px] font-bold text-center mb-16 reveal opacity-0 translate-y-5">
            Discover Your <span className={`${isDarkMode ? 'text-[#CCFF00]' : 'text-[#8DB300]'}`}>Vibe</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 reveal opacity-0 translate-y-5" style={{ transitionDelay: '100ms' }}>
            {[
              { icon: 'playing_cards', label: 'Card Games', color: isDarkMode ? 'text-[#CCFF00]' : 'text-[#8DB300]', bgHover: isDarkMode ? 'hover:bg-[#CCFF00]/10' : 'hover:bg-[#CCFF00]/30' },
              { icon: 'grid_on', label: 'Board Games', color: 'text-[#FF9F0A]', bgHover: isDarkMode ? 'hover:bg-[#FF9F0A]/10' : 'hover:bg-[#FF9F0A]/20' },
              { icon: 'sports_esports', label: 'Arcade', color: 'text-[#00F0FF]', bgHover: isDarkMode ? 'hover:bg-[#00F0FF]/10' : 'hover:bg-[#00F0FF]/20' },
              { icon: 'celebration', label: 'Party', color: 'text-[#FF9F0A]', bgHover: isDarkMode ? 'hover:bg-[#FF9F0A]/10' : 'hover:bg-[#FF9F0A]/20' },
              { icon: 'extension', label: 'Puzzle', color: isDarkMode ? 'text-[#CCFF00]' : 'text-[#8DB300]', bgHover: isDarkMode ? 'hover:bg-[#CCFF00]/10' : 'hover:bg-[#CCFF00]/30' },
              { icon: 'precision_manufacturing', label: 'Strategy', color: 'text-[#FF9F0A]', bgHover: isDarkMode ? 'hover:bg-[#FF9F0A]/10' : 'hover:bg-[#FF9F0A]/20' },
              { icon: 'match_case', label: 'Word', color: 'text-[#00F0FF]', bgHover: isDarkMode ? 'hover:bg-[#00F0FF]/10' : 'hover:bg-[#00F0FF]/20' },
              { icon: 'coffee', label: 'Casual', color: 'text-[#FF9F0A]', bgHover: isDarkMode ? 'hover:bg-[#FF9F0A]/10' : 'hover:bg-[#FF9F0A]/20' }
            ].map((item, i) => (
              <div key={i} className={`glass-panel group p-8 rounded-2xl flex flex-col items-center gap-4 hover:scale-105 ${item.bgHover} transition-all cursor-pointer`}>
                <span className={`material-symbols-outlined text-5xl ${item.color} group-hover:scale-125 transition-transform`}>{item.icon}</span>
                <span className="font-bold text-[18px]">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Download CTA */}
        <section className="py-24 px-6 md:px-12 reveal opacity-0 translate-y-5">
          <div className={`max-w-7xl mx-auto rounded-[48px] p-12 md:p-20 text-center relative overflow-hidden group border ${isDarkMode ? 'bg-gradient-to-br from-[#CCFF00]/20 to-[#00F0FF]/20 border-white/10' : 'bg-gradient-to-br from-[#CCFF00]/40 to-[#00F0FF]/40 border-[#0B192C]/10'}`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 space-y-8">
              <h2 className={`text-[40px] md:text-[64px] font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-[#0B192C]'}`}>Ready to Start Playing?</h2>
              <p className={`text-[18px] max-w-2xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-[#0B192C]/80'}`}>Join 20 million players worldwide. Download JOE YOKE today and turn every moment into a game night.</p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className={`flex items-center gap-3 px-8 py-4 rounded-2xl hover:scale-105 transition-all ${isDarkMode ? 'bg-[#060e20] text-white border border-white/10' : 'bg-white text-[#0B192C] shadow-lg border border-gray-200'}`}>
                  <span className="material-symbols-outlined text-3xl text-[#00F0FF]">apps</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-gray-400">Download on the</div>
                    <div className="text-xl font-bold">App Store</div>
                  </div>
                </button>
                <button className={`flex items-center gap-3 px-8 py-4 rounded-2xl hover:scale-105 transition-all ${isDarkMode ? 'bg-[#060e20] text-white border border-white/10' : 'bg-white text-[#0B192C] shadow-lg border border-gray-200'}`}>
                  <span className="material-symbols-outlined text-3xl text-[#CCFF00]">play_books</span>
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold text-gray-400">Get it on</div>
                    <div className="text-xl font-bold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className={`w-full py-12 px-6 md:px-12 border-t mt-12 transition-colors duration-300 ${isDarkMode ? 'bg-[#060e20] border-white/10' : 'bg-gray-100 border-gray-200'}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto">
            <div className="space-y-6">
              <div className="text-[24px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#CCFF00] to-[#FF9F0A]">JOE YOKE</div>
              <p className="text-gray-400 text-sm">Redefining social gaming through premium mobile experiences.</p>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-[#FF9F0A]">Explore</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a className={`transition-colors ${isDarkMode ? 'hover:text-[#CCFF00]' : 'hover:text-[#8DB300]'}`} href="#">Games Library</a></li>
                <li><a className={`transition-colors ${isDarkMode ? 'hover:text-[#CCFF00]' : 'hover:text-[#8DB300]'}`} href="#">Latest News</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-[#FF9F0A]">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a className={`transition-colors ${isDarkMode ? 'hover:text-[#CCFF00]' : 'hover:text-[#8DB300]'}`} href="#">Support</a></li>
                <li><a className={`transition-colors ${isDarkMode ? 'hover:text-[#CCFF00]' : 'hover:text-[#8DB300]'}`} href="#">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className={`mt-12 pt-8 border-t text-center text-sm ${isDarkMode ? 'border-white/10 text-gray-500' : 'border-gray-200 text-gray-500'}`}>
            © {new Date().getFullYear()} JOE YOKE Gaming. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}