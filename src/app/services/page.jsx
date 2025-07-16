"use client"
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { 
  Globe, Shield, Users, FileText, Phone, Mail, MapPin, Clock, 
  ChevronRight, Star, Search, Bell, User, Menu, X, ArrowRight,
  Building, Car, Heart, GraduationCap, Home, Briefcase, 
  Activity, Award, Eye, MousePointer, Zap, TrendingUp
} from 'lucide-react';
const StateAgencyServicePage = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const earthRef = useRef(null);
  const [activeService, setActiveService] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState('/services');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [isEarthHovered, setIsEarthHovered] = useState(false);

  // Navigation handler
  const navigate = (route) => {
    setCurrentRoute(route);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Enhanced Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000033, 1, 10);
    
    const camera = new THREE.PerspectiveCamera(75, 450 / 350, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(450, 350);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Enhanced Earth with more detail
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    
    // Create detailed earth texture
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Ocean with gradient
    const oceanGradient = ctx.createLinearGradient(0, 0, 0, 512);
    oceanGradient.addColorStop(0, '#0f172a');
    oceanGradient.addColorStop(0.5, '#1e40af');
    oceanGradient.addColorStop(1, '#0369a1');
    ctx.fillStyle = oceanGradient;
    ctx.fillRect(0, 0, 1024, 512);
    
    // Add ocean texture
    ctx.fillStyle = 'rgba(59, 130, 246, 0.3)';
    for (let i = 0; i < 50; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      const size = Math.random() * 20 + 5;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Enhanced continent shapes with more detail
    ctx.fillStyle = '#f8fafc';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 5;
    
    // North America with more detail
    ctx.fillRect(120, 80, 80, 60);
    ctx.fillRect(140, 140, 60, 40);
    ctx.fillRect(100, 100, 40, 30);
    
    // Europe/Asia complex
    ctx.fillRect(300, 70, 120, 40);
    ctx.fillRect(350, 110, 150, 50);
    ctx.fillRect(480, 90, 100, 60);
    
    // Africa detailed
    ctx.fillRect(320, 160, 60, 100);
    ctx.fillRect(340, 140, 30, 20);
    
    // South America
    ctx.fillRect(180, 200, 50, 120);
    ctx.fillRect(200, 180, 20, 40);
    
    // Australia and islands
    ctx.fillRect(520, 280, 60, 30);
    ctx.fillRect(600, 200, 20, 15);
    
    // Add city lights effect
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 512;
      ctx.beginPath();
      ctx.arc(x, y, 1, 0, Math.PI * 2);
      ctx.fill();
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshPhongMaterial({ 
      map: texture,
      shininess: 30,
      specular: 0x111111
    });
    
    const earth = new THREE.Mesh(geometry, material);
    earth.castShadow = true;
    earth.receiveShadow = true;
    scene.add(earth);
    earthRef.current = earth;

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(1.3, 32, 32);
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      side: THREE.BackSide
    });
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
    scene.add(atmosphere);

    // Add stars
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Enhanced lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Add rim lighting
    const rimLight = new THREE.DirectionalLight(0x3b82f6, 0.5);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    camera.position.z = 3;
    sceneRef.current = { scene, camera, renderer, earth, atmosphere, stars };

    // Enhanced animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (earthRef.current) {
        earthRef.current.rotation.y += isEarthHovered ? 0.01 : 0.003;
        earthRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }
      if (stars) {
        stars.rotation.y += 0.0005;
      }
      if (atmosphere) {
        atmosphere.rotation.y += 0.002;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isEarthHovered]);

  const services = [
    {
      id: 'business',
      icon: <Building className="w-7 h-7" />,
      title: 'Business Services',
      description: 'Complete business registration and licensing solutions',
      features: ['LLC Registration', 'Business Licenses', 'Tax ID Numbers', 'Compliance Tracking'],
      color: 'from-blue-500 to-blue-600',
      route: '/business'
    },
    {
      id: 'transport',
      icon: <Car className="w-7 h-7" />,
      title: 'Transportation',
      description: 'Vehicle registration and driving services',
      features: ['Vehicle Registration', 'Driver Licenses', 'Road Tests', 'Traffic Violations'],
      color: 'from-indigo-500 to-indigo-600',
      route: '/transport'
    },
    {
      id: 'health',
      icon: <Heart className="w-7 h-7" />,
      title: 'Health Services',
      description: 'Healthcare registration and medical services',
      features: ['Health Records', 'Medical Licenses', 'Insurance Claims', 'Vaccination Records'],
      color: 'from-purple-500 to-purple-600',
      route: '/health'
    },
    {
      id: 'education',
      icon: <GraduationCap className="w-7 h-7" />,
      title: 'Education',
      description: 'Educational services and certifications',
      features: ['School Enrollment', 'Transcripts', 'Certifications', 'Student Aid'],
      color: 'from-green-500 to-green-600',
      route: '/education'
    },
    {
      id: 'housing',
      icon: <Home className="w-7 h-7" />,
      title: 'Housing & Property',
      description: 'Property registration and housing services',
      features: ['Property Deeds', 'Building Permits', 'Zoning Info', 'Tax Assessment'],
      color: 'from-orange-500 to-orange-600',
      route: '/housing'
    },
    {
      id: 'employment',
      icon: <Briefcase className="w-7 h-7" />,
      title: 'Employment',
      description: 'Job services and unemployment benefits',
      features: ['Job Matching', 'Unemployment Benefits', 'Career Services', 'Training Programs'],
      color: 'from-teal-500 to-teal-600',
      route: '/employment'
    }
  ];

  const stats = [
    { label: 'Digital Services', value: '50+', icon: <Activity className="w-5 h-5" />, change: '+12%' },
    { label: 'Citizens Served', value: '2.3M+', icon: <Users className="w-5 h-5" />, change: '+8%' },
    { label: 'Satisfaction Rate', value: '98.5%', icon: <Star className="w-5 h-5" />, change: '+2%' },
    { label: 'Processing Time', value: '< 2 min', icon: <Zap className="w-5 h-5" />, change: '-30%' }
  ];

  const features = [
    { icon: <Eye className="w-8 h-8" />, title: 'Transparent', desc: 'Real-time status tracking' },
    { icon: <MousePointer className="w-8 h-8" />, title: 'User-Friendly', desc: 'Intuitive interface design' },
    { icon: <Shield className="w-8 h-8" />, title: 'Secure', desc: 'Bank-level encryption' },
    { icon: <Clock className="w-8 h-8" />, title: '24/7 Available', desc: 'Always accessible online' }
  ];

  const navLinks = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Services', route: '/services' },
    { name: 'Applications', route: '/applications' },
    { name: 'Support', route: '/support' },
    { name: 'About', route: '/about' }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
      // Add search functionality here
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Enhanced Header */}
     
            

       

      {/* Enhanced Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2">
                  <Award className="w-4 h-4 text-blue-300" />
                  <span className="text-blue-200 text-sm font-medium">Award-Winning Platform</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  SK
                  <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Agency
                  </span>
                  Services
                </h2>
                <p className="text-xl text-blue-100 leading-relaxed">
                  Experience the future of public services with our AI-powered platform. 
                  Fast, secure, and designed for the digital age.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center space-x-2 shadow-2xl hover:shadow-blue-500/25"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate('/about')}
                  className="px-8 py-4 border-2 border-blue-400 text-blue-300 rounded-xl hover:bg-blue-500/20 transition-all duration-300 font-semibold backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 rounded-xl mb-3 text-blue-300 group-hover:bg-blue-500/30 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-white font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-blue-200 text-xs">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex justify-center">
              <div 
                className="relative cursor-pointer"
                onMouseEnter={() => setIsEarthHovered(true)}
                onMouseLeave={() => setIsEarthHovered(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-3xl blur-3xl"></div>
                <div ref={mountRef} className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-3xl pointer-events-none"></div>
                {isEarthHovered && (
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 animate-fadeIn">
                    <p className="text-white text-sm">Interactive Earth Model</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                    <div className="text-blue-300">{stat.icon}</div>
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-blue-200 mb-2">{stat.label}</div>
                  <div className="inline-flex items-center space-x-1 text-green-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Comprehensive Services
            </h2>
            <p className="text-xl text-blue-200 max-w-3xl mx-auto">
              Streamlined government services powered by cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`group relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  activeService === service.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setActiveService(activeService === service.id ? null : service.id)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">{service.icon}</div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-blue-200 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {activeService === service.id && (
                    <div className="space-y-3 mb-6 animate-fadeIn">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-3">
                          <ChevronRight className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-100">{feature}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(service.route);
                    }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r ${service.color} text-white hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center space-x-2 group`}
                  >
                    <span>Access Service</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-24 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Get Support
            </h2>
            <p className="text-xl text-blue-200">
              Multiple ways to reach our expert support team
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Phone, title: 'Phone Support', desc: '24/7 dedicated helpline', contact: '03084931083-STATE-SK', color: 'from-green-500 to-green-600' },
              { icon: Mail, title: 'Email Support', desc: 'Fast response guaranteed', contact: 'sardarsaadisaadi@gmail.com', color: 'from-blue-500 to-blue-600' },
              { icon: MapPin, title: 'Visit Office', desc: 'In-person assistance', contact: ' 03084931083 SK-plaza fsd', color: 'from-purple-500 to-purple-600' }
            ].map((contact, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 group-hover:scale-105">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${contact.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                    <contact.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{contact.title}</h3>
                  <p className="text-blue-200 mb-4">{contact.desc}</p>
                  <p className="text-blue-300 font-semibold">{contact.contact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default StateAgencyServicePage;
