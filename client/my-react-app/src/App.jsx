import { useEffect, useState } from "react";
import { api } from "./api";

export default function App() {
  const [talents, setTalents] = useState([]);
  const [projets, setProjets] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [talentMap, setTalentMap] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  
  const [loading, setLoading] = useState({
    talents: false,
    projets: false,
    collaborators: false,
    talentMap: false,
    search: false,
    profile: false
  });
  
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSection, setActiveSection] = useState(null);
  const [searchParams, setSearchParams] = useState({
    skill: "",
    language: "",
    passion: "",
    project: "",
    name: ""
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    skills: "",
    languages: "",
    passions: "",
    projects: ""
  });
  const [newProject, setNewProject] = useState({
    nom: "",
    description: "",
    UserId: ""
  });
  const [newTalent, setNewTalent] = useState({
    nom: "",
    categorie: ""
  });
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddTalent, setShowAddTalent] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (authToken) {
      setLoading(prev => ({ ...prev, profile: true }));
      api.get("/users/me", {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then(res => {
        setUserProfile(res.data);
        setLoading(prev => ({ ...prev, profile: false }));
      })
      .catch(err => {
        console.log("Erreur profil:", err);
        localStorage.removeItem("token");
        setAuthToken(null);
        setLoading(prev => ({ ...prev, profile: false }));
      });
    }
  }, [authToken]);

  const loadTalents = () => {
    setLoading(prev => ({ ...prev, talents: true }));
    api.get("/talents")
      .then(res => {
        setTalents(res.data);
        setLoading(prev => ({ ...prev, talents: false }));
      })
      .catch(err => {
        console.log("Erreur talents:", err);
        setLoading(prev => ({ ...prev, talents: false }));
      });
  };

  const loadProjets = () => {
    setLoading(prev => ({ ...prev, projets: true }));
    api.get("/projets")
      .then(res => {
        setProjets(res.data);
        setLoading(prev => ({ ...prev, projets: false }));
      })
      .catch(err => {
        console.log("Erreur projets:", err);
        setLoading(prev => ({ ...prev, projets: false }));
      });
  };

  const loadCollaborators = () => {
    setLoading(prev => ({ ...prev, collaborators: true }));
    api.get("/collaborators")
      .then(res => {
        setCollaborators(res.data);
        setLoading(prev => ({ ...prev, collaborators: false }));
      })
      .catch(err => {
        console.log("Erreur collaborateurs:", err);
        setLoading(prev => ({ ...prev, collaborators: false }));
      });
  };

  const loadTalentMap = () => {
    setLoading(prev => ({ ...prev, talentMap: true }));
    api.get("/talents/map")
      .then(res => {
        setTalentMap(res.data);
        setLoading(prev => ({ ...prev, talentMap: false }));
      })
      .catch(err => {
        console.log("Erreur talent map:", err);
        setLoading(prev => ({ ...prev, talentMap: false }));
      });
  };

  const handleSearch = () => {
    setLoading(prev => ({ ...prev, search: true }));
    const params = new URLSearchParams();
    Object.keys(searchParams).forEach(key => {
      if (searchParams[key]) params.append(key, searchParams[key]);
    });

    api.get(`/search?${params.toString()}`)
      .then(res => {
        setSearchResults(res.data);
        setLoading(prev => ({ ...prev, search: false }));
      })
      .catch(err => {
        console.log("Erreur recherche:", err);
        setLoading(prev => ({ ...prev, search: false }));
      });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/users/login", loginData);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setAuthToken(token);
      setUserProfile(user);
      setShowLogin(false);
      setLoginData({ email: "", password: "" });
    } catch (err) {
      alert("Erreur de connexion: " + (err.response?.data?.msg || err.message));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...registerData,
        skills: registerData.skills.split(",").map(s => s.trim()).filter(s => s),
        languages: registerData.languages.split(",").map(l => l.trim()).filter(l => l),
        passions: registerData.passions.split(",").map(p => p.trim()).filter(p => p),
        projects: registerData.projects.split(",").map(p => p.trim()).filter(p => p)
      };
      
      await api.post("/users/register", formattedData);
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      setShowRegister(false);
      setRegisterData({
        firstname: "", lastname: "", email: "", password: "",
        skills: "", languages: "", passions: "", projects: ""
      });
    } catch (err) {
      alert("Erreur d'inscription: " + (err.response?.data?.error || err.message));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    setUserProfile(null);
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await api.post("/projets", newProject);
      alert("Projet ajouté avec succès !");
      loadProjets();
      setShowAddProject(false);
      setNewProject({ nom: "", description: "", UserId: "" });
    } catch (err) {
      alert("Erreur lors de l'ajout du projet: " + err.message);
    }
  };

  const handleAddTalent = async (e) => {
    e.preventDefault();
    try {
      await api.post("/talents", newTalent);
      alert("Talent ajouté avec succès !");
      loadTalents();
      setShowAddTalent(false);
      setNewTalent({ nom: "", categorie: "" });
    } catch (err) {
      alert("Erreur lors de l'ajout du talent: " + err.message);
    }
  };

  const handleVerifyTalent = async (id) => {
    try {
      await api.patch(`/talents/${id}/verify`);
      alert("Talent vérifié !");
      loadTalents();
    } catch (err) {
      alert("Erreur lors de la vérification: " + err.message);
    }
  };

  const filteredTalents = activeFilter === "all" 
    ? talents 
    : talents.filter(t => t.categorie === activeFilter);

  const categories = [...new Set(talents.map(t => t.categorie))];

  const apiFeatures = [
    {
      id: 'search',
      title: 'Recherche Avancée',
      icon: '🔍',
      endpoint: 'GET /api/search',
      description: 'Rechercher des utilisateurs par compétences, langues, passions, projets ou nom',
      action: () => setActiveSection('search')
    },
    {
      id: 'talents',
      title: 'Gestion des Talents',
      icon: '🌟',
      endpoint: 'GET/POST/PATCH /api/talents',
      description: 'Créer, lister et vérifier les talents',
      action: () => {
        setActiveSection('talents');
        if (talents.length === 0) loadTalents();
      }
    },
    {
      id: 'talentMap',
      title: 'Carte des Talents',
      icon: '🗺️',
      endpoint: 'GET /api/talents/map',
      description: 'Visualiser la distribution des talents',
      action: () => {
        setActiveSection('talentMap');
        if (talentMap.length === 0) loadTalentMap();
      }
    },
    {
      id: 'projets',
      title: 'Gestion des Projets',
      icon: '📚',
      endpoint: 'GET/POST /api/projets',
      description: 'Créer et lister les projets',
      action: () => {
        setActiveSection('projets');
        if (projets.length === 0) loadProjets();
      }
    },
    {
      id: 'collaborators',
      title: 'Collaborateurs',
      icon: '👥',
      endpoint: 'GET /api/collaborators',
      description: 'Lister tous les collaborateurs et leurs compétences',
      action: () => {
        setActiveSection('collaborators');
        if (collaborators.length === 0) loadCollaborators();
      }
    },
    {
      id: 'profile',
      title: 'Mon Profil',
      icon: '👤',
      endpoint: 'GET /api/users/me',
      description: 'Voir mes informations (Authentification requise)',
      action: () => {
        if (!authToken) {
          alert("Vous devez être connecté pour voir votre profil");
          setShowLogin(true);
        } else {
          setActiveSection('profile');
        }
      },
      requiresAuth: true
    }
  ];

  return (
    <div style={styles.container}>
      <div style={styles.stars}>
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            style={{
              ...styles.star,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div>
            <h1 style={styles.title}>📚 CARTE DES TALENTS API</h1>
           
          </div>
          
          <div style={styles.authSection}>
            {authToken ? (
              <div style={styles.userInfo}>
                <span>⚡ {userProfile?.firstname} {userProfile?.lastname}</span>
                <button onClick={handleLogout} style={styles.logoutBtn}>Déconnexion</button>
              </div>
            ) : (
              <div style={styles.authButtons}>
                <button onClick={() => setShowLogin(true)} style={styles.authBtn}>Connexion</button>
                <button onClick={() => setShowRegister(true)} style={{...styles.authBtn, ...styles.authBtnPrimary}}>Inscription</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={styles.main}>
        {!activeSection ? (
          <div style={styles.welcomeSection}>
            <h2 style={styles.welcomeTitle}>Sélectionnez une fonctionnalité API</h2>
           <div style={styles.featuresGrid}>
  {apiFeatures.map((feature, i) => (
    <div
      key={feature.id}
      onClick={feature.action}
      style={{
        ...styles.featureCard,
        animationDelay: `${i * 0.1}s`,
        transform: `perspective(1000px) rotateY(${(mousePos.x - 50) * 0.02}deg) rotateX(${(mousePos.y - 50) * -0.02}deg)`
      }}
    >
      <div style={styles.featureIcon}>{feature.icon}</div>
      <h3 style={styles.featureTitle}>{feature.title}</h3>
      <p style={styles.featureDescription}>{feature.description}</p>
      {feature.requiresAuth && !authToken && (
        <div style={styles.authRequired}>🔒 Authentification requise</div>
      )}
    </div>
  ))}
</div>
          </div>
        ) : (
          <div style={styles.contentSection}>
            <div style={styles.backButton} onClick={() => setActiveSection(null)}>
              ← Retour aux fonctionnalités
            </div>

            {activeSection === 'search' && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  <span>🔍</span> Recherche Avancée
                  <span style={styles.endpoint}>GET /api/search</span>
                </h2>
                <div style={styles.searchGrid}>
                  <input
                    type="text"
                    placeholder="Compétence (ex: JavaScript)"
                    value={searchParams.skill}
                    onChange={(e) => setSearchParams({...searchParams, skill: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Langue (ex: Français)"
                    value={searchParams.language}
                    onChange={(e) => setSearchParams({...searchParams, language: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Passion (ex: IA)"
                    value={searchParams.passion}
                    onChange={(e) => setSearchParams({...searchParams, passion: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Projet"
                    value={searchParams.project}
                    onChange={(e) => setSearchParams({...searchParams, project: e.target.value})}
                    style={styles.input}
                  />
                  <input
                    type="text"
                    placeholder="Nom"
                    value={searchParams.name}
                    onChange={(e) => setSearchParams({...searchParams, name: e.target.value})}
                    style={styles.input}
                  />
                  <button onClick={handleSearch} style={styles.searchBtn} disabled={loading.search}>
                    {loading.search ? "Recherche..." : "Rechercher"}
                  </button>
                </div>

                {searchResults.length > 0 && (
                  <div style={styles.resultsContainer}>
                    <h3 style={styles.resultsTitle}>Résultats: {searchResults.length} utilisateur(s)</h3>
                    <div style={styles.cardsGrid}>
                      {searchResults.map((user, i) => (
                        <div key={user.id} style={{...styles.card, animationDelay: `${i * 0.05}s`}}>
                          <div style={styles.avatar}>{user.firstname?.[0]}{user.lastname?.[0]}</div>
                          <h4 style={styles.cardTitle}>{user.firstname} {user.lastname}</h4>
                          <p style={styles.cardEmail}>{user.email}</p>
                          <div style={styles.tags}>
                            {user.skills?.map((skill, i) => (
                              <span key={i} style={styles.tag}>{skill}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeSection === 'talents' && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <div>
                    <h2 style={styles.sectionTitle}>
                      <span>🌟</span> Gestion des Talents
                      <span style={styles.endpoint}>GET/POST/PATCH /api/talents</span>
                    </h2>
                  </div>
                  <button onClick={() => setShowAddTalent(true)} style={styles.addBtn}>
                    + Ajouter un talent
                  </button>
                </div>

                {loading.talents ? (
                  <div style={styles.loading}>Chargement...</div>
                ) : (
                  <>
                    <div style={styles.filterButtons}>
                      <button 
                        style={activeFilter === "all" ? {...styles.filterBtn, ...styles.filterBtnActive} : styles.filterBtn}
                        onClick={() => setActiveFilter("all")}
                      >
                        Tous ({talents.length})
                      </button>
                      {categories.map(cat => (
                        <button 
                          key={cat}
                          style={activeFilter === cat ? {...styles.filterBtn, ...styles.filterBtnActive} : styles.filterBtn}
                          onClick={() => setActiveFilter(cat)}
                        >
                          {cat} ({talents.filter(t => t.categorie === cat).length})
                        </button>
                      ))}
                    </div>

                   <div style={styles.talentCirclesGrid}>
  {filteredTalents.map((talent, i) => (
    <div 
      key={talent.id} 
      style={{
        ...styles.talentCircleCard,
        animationDelay: `${i * 0.05}s`,
        borderColor: talent.verified ? '#00ff88' : '#ff0088'
      }}
    >
      <div style={styles.talentCircleHeader}>
        <div style={styles.talentIcon}>
          {talent.verified ? '✅' : '🌟'}
        </div>
        <h3 style={styles.talentCircleTitle}>{talent.nom}</h3>
        <span style={styles.talentCategory}>{talent.categorie}</span>
      </div>
      {!talent.verified && (
        <button 
          onClick={() => handleVerifyTalent(talent.id)} 
          style={styles.circleVerifyBtn}
        >
          Vérifier
        </button>
      )}
    </div>
  ))}
</div>
                  </>
                )}
              </div>
            )}

            {activeSection === 'talentMap' && (
  <div style={styles.section}>
    <h2 style={styles.sectionTitle}>
      <span>🗺️</span> Carte des Talents
      <span style={styles.endpoint}>GET /api/talents/map</span>
    </h2>

    {loading.talentMap ? (
      <div style={styles.loading}>Chargement...</div>
    ) : (
      <div style={styles.talentCirclesGrid}>
        {talentMap.map((item, i) => {
          // Calcule une couleur basée sur le nombre d'utilisateurs
          const intensity = Math.min(item.count / 20, 0.7);
          const colorIntensity = Math.floor(136 + (intensity * 119)); // 136 à 255
          
          return (
            <div 
              key={i} 
              style={{
                background: `radial-gradient(circle at 30% 30%, 
                  rgba(0, 255, ${colorIntensity}, ${intensity}), 
                  rgba(0, 0, 0, 0.9))`,
                border: `2px solid rgba(0, 255, ${colorIntensity}, 0.8)`,
                borderRadius: '50%',
                padding: '1rem',
                transition: 'all 0.3s',
                animation: 'slideIn 0.5s ease-out forwards',
                width: '140px',
                height: '140px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                margin: '0 auto',
                cursor: 'pointer',
                fontFamily: '"Courier New", monospace',
                color: '#fff',
                animationDelay: `${i * 0.05}s`,
                boxShadow: `0 0 20px rgba(0, 255, ${colorIntensity}, 0.3)`
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem'
              }}>
                <div style={{
                  fontSize: '1.8rem',
                  marginBottom: '0.2rem'
                }}>
                  {item.count > 10 ? '🔥' : item.count > 5 ? '⭐' : '🌟'}
                </div>
                <h3 style={{
                  fontSize: '0.85rem',
                  color: `rgba(0, 255, ${colorIntensity}, 1)`,
                  margin: 0,
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  lineHeight: '1.1',
                  letterSpacing: '0.5px'
                }}>
                  {item.talent}
                </h3>
                <span style={{
                  background: `rgba(0, 255, ${colorIntensity}, 0.2)`,
                  border: `1px solid rgba(0, 255, ${colorIntensity}, 0.5)`,
                  color: `rgba(0, 255, ${colorIntensity}, 1)`,
                  padding: '0.2rem 0.6rem',
                  borderRadius: '12px',
                  fontSize: '0.7rem',
                  fontWeight: '600'
                }}>
                  {item.count} {item.count === 1 ? 'personne' : 'personnes'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}

            {activeSection === 'projets' && (
              <div style={styles.section}>
                <div style={styles.sectionHeader}>
                  <div>
                    <h2 style={styles.sectionTitle}>
                      <span>📚</span> Gestion des Projets
                      <span style={styles.endpoint}>GET/POST /api/projets</span>
                    </h2>
                  </div>
                  <button onClick={() => setShowAddProject(true)} style={styles.addBtn}>
                    + Nouveau projet
                  </button>
                </div>

                {loading.projets ? (
                  <div style={styles.loading}>Chargement...</div>
                ) : (
                  <div style={styles.cardsGrid}>
                    {projets.map((projet, i) => (
                      <div key={projet.id} style={{...styles.card, animationDelay: `${i * 0.05}s`}}>
                        <div style={styles.cardHeader}>
                          <h3 style={styles.cardTitle}>{projet.nom}</h3>
                          <span style={styles.statusBadge}>{projet.status || "active"}</span>
                        </div>
                        <p style={styles.cardDescription}>{projet.description || "Pas de description"}</p>
                        <div style={styles.cardMeta}>
                          <p>ID: {projet.id}</p>
                          <p>User ID: {projet.UserId || "N/A"}</p>
                          <p>Créé le: {new Date(projet.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'collaborators' && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  <span>👥</span> Collaborateurs
                  <span style={styles.endpoint}>GET /api/collaborators</span>
                </h2>

                {loading.collaborators ? (
                  <div style={styles.loading}>Chargement...</div>
                ) : (
                  <div style={styles.cardsGrid}>
                    {collaborators.map((user, i) => (
                      <div key={user.id} style={{...styles.card, animationDelay: `${i * 0.05}s`}}>
                        <div style={styles.avatar}>{user.firstname?.[0]}{user.lastname?.[0]}</div>
                        <h3 style={styles.cardTitle}>{user.firstname} {user.lastname}</h3>
                        <p style={styles.cardEmail}>{user.email}</p>
                        
                        {user.skills && user.skills.length > 0 && (
                          <div style={styles.skillSection}>
                            <strong>Compétences:</strong>
                            <div style={styles.tags}>
                              {user.skills.map((skill, i) => (
                                <span key={i} style={styles.tag}>{skill}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        {user.languages && user.languages.length > 0 && (
                          <div style={styles.skillSection}>
                            <strong>Langues:</strong>
                            <div style={styles.tags}>
                              {user.languages.map((lang, i) => (
                                <span key={i} style={{...styles.tag, ...styles.tagLang}}>{lang}</span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div style={styles.verifiedStatus}>
                          {user.talent_verified ? "✅ Talent vérifié" : "❌ Non vérifié"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeSection === 'profile' && userProfile && (
              <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                  <span>👤</span> Mon Profil
                  <span style={styles.endpoint}>GET /api/users/me</span>
                </h2>

                <div style={styles.profileCard}>
                  <div style={styles.profileAvatar}>
                    {userProfile.firstname?.[0]}{userProfile.lastname?.[0]}
                  </div>
                  <h2 style={styles.profileName}>{userProfile.firstname} {userProfile.lastname}</h2>
                  <p style={styles.profileEmail}>{userProfile.email}</p>
                  
                  <div style={styles.profileDetails}>
                    <div style={styles.profileSection}>
                      <h4>Compétences</h4>
                      <div style={styles.tags}>
                        {userProfile.skills?.map((skill, i) => (
                          <span key={i} style={styles.tag}>{skill}</span>
                        )) || <span>Aucune</span>}
                      </div>
                    </div>

                    <div style={styles.profileSection}>
                      <h4>Langues</h4>
                      <div style={styles.tags}>
                        {userProfile.languages?.map((lang, i) => (
                          <span key={i} style={{...styles.tag, ...styles.tagLang}}>{lang}</span>
                        )) || <span>Aucune</span>}
                      </div>
                    </div>

                    <div style={styles.profileSection}>
                      <h4>Passions</h4>
                      <div style={styles.tags}>
                        {userProfile.passions?.map((passion, i) => (
                          <span key={i} style={styles.tag}>{passion}</span>
                        )) || <span>Aucune</span>}
                      </div>
                    </div>

                    <div style={styles.profileSection}>
                      <h4>Projets</h4>
                      <div style={styles.tags}>
                        {userProfile.projects?.map((project, i) => (
                          <span key={i} style={styles.tag}>{project}</span>
                        )) || <span>Aucun</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showLogin && (
        <div style={styles.modalOverlay} onClick={() => setShowLogin(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Connexion</h2>
            <p style={styles.modalEndpoint}>POST /api/users/login</p>
        <form onSubmit={handleLogin}>
  <input
    type="email"
    placeholder="Email"
    value={loginData.email}
    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
    style={{...styles.input, marginBottom: '10px'}}
    required
  />
  <input
    type="password"
    placeholder="Mot de passe"
    value={loginData.password}
    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
    style={{...styles.input, marginBottom: '10px'}}
    required
  />
  <div style={styles.modalButtons}>
    <button type="submit" style={styles.submitBtn}>Se connecter</button>
    <button type="button" onClick={() => setShowLogin(false)} style={styles.cancelBtn}>Annuler</button>
  </div>
</form>
          </div>
        </div>
      )}

      {showRegister && (
        <div style={styles.modalOverlay} onClick={() => setShowRegister(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={styles.modalTitle}>Inscription</h2>
            <p style={styles.modalEndpoint}>POST /api/users/register</p>
          <form onSubmit={handleRegister}>
  <input 
    type="text" 
    placeholder="Prénom" 
    value={registerData.firstname} 
    onChange={(e) => setRegisterData({...registerData, firstname: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
    required 
  />
  <input 
    type="text" 
    placeholder="Nom" 
    value={registerData.lastname} 
    onChange={(e) => setRegisterData({...registerData, lastname: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
    required 
  />
  <input 
    type="email" 
    placeholder="Email" 
    value={registerData.email} 
    onChange={(e) => setRegisterData({...registerData, email: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
    required 
  />
  <input 
    type="password" 
    placeholder="Mot de passe" 
    value={registerData.password} 
    onChange={(e) => setRegisterData({...registerData, password: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
    required 
  />
  <input 
    type="text" 
    placeholder="Compétences (séparées par virgules)" 
    value={registerData.skills} 
    onChange={(e) => setRegisterData({...registerData, skills: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
  />
  <input 
    type="text" 
    placeholder="Langues (séparées par virgules)" 
    value={registerData.languages} 
    onChange={(e) => setRegisterData({...registerData, languages: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
  />
  <input 
    type="text" 
    placeholder="Passions (séparées par virgules)" 
    value={registerData.passions} 
    onChange={(e) => setRegisterData({...registerData, passions: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
  />
  <input 
    type="text" 
    placeholder="Projets (séparés par virgules)" 
    value={registerData.projects} 
    onChange={(e) => setRegisterData({...registerData, projects: e.target.value})} 
    style={{...styles.input, marginBottom: '10px'}} 
  />
  <div style={styles.modalButtons}>
    <button type="submit" style={styles.submitBtn}>S'inscrire</button>
    <button type="button" onClick={() => setShowRegister(false)} style={styles.cancelBtn}>Annuler</button>
  </div>
</form>
          </div>
        </div>
      )}

      <style>{keyframes}</style>
    </div>
  );
}

const keyframes = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes neonGlow {
    0%, 100% { 
      box-shadow: 0 0 5px #00ff88, 0 0 10px #00ff88;
    }
    50% { 
      box-shadow: 0 0 10px #00ff88, 0 0 20px #00ff88, 0 0 30px #00ff88;
    }
  }
`;

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #000428 0%, #004e92 50%, #000428 100%)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '"Courier New", monospace',
    color: '#fff'
  },
  stars: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 1
  },
  star: {
    position: 'absolute',
    width: '2px',
    height: '2px',
    background: '#fff',
    borderRadius: '50%',
    animation: 'twinkle 3s infinite ease-in-out'
  },
  header: {
    position: 'relative',
    zIndex: 10,
    padding: '2rem',
    background: 'rgba(0, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    borderBottom: '2px solid #00ff88'
  },
  headerContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1400px',
    margin: '0 auto',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: 0,
    color: '#00ff88',
    textShadow: '0 0 10px #00ff88',
    letterSpacing: '2px'
  },
  subtitle: {
    fontSize: '0.9rem',
    color: '#00d4ff',
    marginTop: '0.5rem',
    letterSpacing: '1px'
  },
  authSection: {
    display: 'flex',
    gap: '1rem'
  },
  authButtons: {
    display: 'flex',
    gap: '0.5rem'
  },
  authBtn: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #00ff88',
    background: 'transparent',
    color: '#00ff88',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '700',
    transition: 'all 0.3s',
    fontSize: '0.85rem',
    textTransform: 'uppercase',
    fontFamily: '"Courier New", monospace'
  },
  authBtnPrimary: {
    background: '#00ff88',
    color: '#0a0a0a'
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    color: '#00ff88',
    fontSize: '0.9rem'
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    background: 'transparent',
    border: '2px solid #ff0088',
    color: '#ff0088',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontSize: '0.85rem',
    fontFamily: '"Courier New", monospace'
  },
  main: {
    position: 'relative',
    zIndex: 10,
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: 'calc(100vh - 150px)'
  },
  welcomeSection: {
    textAlign: 'center',
    paddingTop: '3rem'
  },
  welcomeTitle: {
    fontSize: '2rem',
    color: '#00ff88',
    marginBottom: '3rem',
    textTransform: 'uppercase',
    letterSpacing: '3px',
    textShadow: '0 0 20px #00ff88'
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  },
  featureCard: {
    background: 'rgba(0, 0, 0, 0.6)',
    border: '2px solid #00ff88',
    borderRadius: '10px',
    padding: '2rem',
    cursor: 'pointer',
    transition: 'all 0.3s',
    animation: 'slideIn 0.5s ease-out forwards',
    transformStyle: 'preserve-3d'
  },
  featureIcon: {
    fontSize: '4rem',
    marginBottom: '1rem'
  },
  featureTitle: {
    fontSize: '1.5rem',
    color: '#00ff88',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '2px'
  },
  featureEndpoint: {
    fontSize: '0.85rem',
    color: '#00d4ff',
    background: 'rgba(0, 212, 255, 0.1)',
    padding: '0.3rem 0.8rem',
    borderRadius: '5px',
    display: 'inline-block',
    marginBottom: '1rem',
    fontFamily: '"Courier New", monospace'
  },
  featureDescription: {
    fontSize: '0.95rem',
    color: '#ccc',
    lineHeight: '1.6'
  },
  authRequired: {
    marginTop: '1rem',
    padding: '0.5rem',
    background: 'rgba(255, 0, 136, 0.1)',
    border: '1px solid #ff0088',
    borderRadius: '5px',
    color: '#ff0088',
    fontSize: '0.85rem'
  },
  contentSection: {
    animation: 'slideIn 0.5s ease-out'
  },
  backButton: {
    display: 'inline-block',
    padding: '0.75rem 1.5rem',
    background: 'transparent',
    border: '2px solid #00ff88',
    color: '#00ff88',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '2rem',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    transition: 'all 0.3s',
    fontFamily: '"Courier New", monospace'
  },
  section: {
    background: 'rgba(0, 0, 0, 0.6)',
    border: '2px solid #00ff88',
    borderRadius: '10px',
    padding: '2rem',
    marginBottom: '2rem'
  },
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  sectionTitle: {
    fontSize: '1.8rem',
    color: '#00ff88',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    flexWrap: 'wrap',
    textTransform: 'uppercase',
    letterSpacing: '2px',
    textShadow: '0 0 10px #00ff88'
  },
  endpoint: {
    fontSize: '0.75rem',
    color: '#00d4ff',
    background: 'rgba(0, 212, 255, 0.1)',
    padding: '0.3rem 0.8rem',
    borderRadius: '5px',
    fontFamily: '"Courier New", monospace',
    fontWeight: 'normal'
  },
  searchGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1rem',
    marginBottom: '2rem'
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    background: 'rgba(0, 0, 0, 0.5)',
    border: '2px solid #00ff88',
    borderRadius: '5px',
    color: '#fff',
    fontSize: '0.9rem',
    fontFamily: '"Courier New", monospace',
    outline: 'none'
  },
  searchBtn: {
    gridColumn: '1 / -1',
    padding: '0.75rem',
    background: '#00ff88',
    color: '#0a0a0a',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: '"Courier New", monospace'
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#00ff88',
    fontSize: '1.2rem'
  },
  resultsContainer: {
    marginTop: '2rem',
    paddingTop: '2rem',
    borderTop: '2px solid #00ff88'
  },
  resultsTitle: {
    fontSize: '1.3rem',
    color: '#00ff88',
    marginBottom: '1.5rem',
    textTransform: 'uppercase'
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '1.5rem'
  },
  card: {
    background: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid #00ff88',
    borderRadius: '10px',
    padding: '1.5rem',
    transition: 'all 0.3s',
    animation: 'slideIn 0.5s ease-out forwards'
  },
  avatar: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
    color: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0 auto 1rem'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '1rem',
    gap: '1rem'
  },
  cardTitle: {
    fontSize: '1.2rem',
    color: '#00ff88',
    margin: 0,
    textTransform: 'uppercase'
  },
  cardEmail: {
    color: '#00d4ff',
    fontSize: '0.9rem',
    marginBottom: '1rem'
  },
  badge: {
    background: 'rgba(0, 212, 255, 0.2)',
    border: '1px solid #00d4ff',
    color: '#00d4ff',
    padding: '0.3rem 0.8rem',
    borderRadius: '5px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  statusBadge: {
    background: 'rgba(0, 255, 136, 0.2)',
    border: '1px solid #00ff88',
    color: '#00ff88',
    padding: '0.3rem 0.8rem',
    borderRadius: '5px',
    fontSize: '0.8rem',
    fontWeight: '600',
    textTransform: 'uppercase'
  },
  cardBody: {
    color: '#ccc',
    fontSize: '0.9rem',
    marginBottom: '1rem'
  },
  cardDescription: {
    color: '#ccc',
    lineHeight: '1.6',
    marginBottom: '1rem'
  },
  cardMeta: {
    fontSize: '0.85rem',
    color: '#999'
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem'
  },
  tag: {
    background: 'rgba(0, 255, 136, 0.2)',
    border: '1px solid #00ff88',
    color: '#00ff88',
    padding: '0.3rem 0.7rem',
    borderRadius: '5px',
    fontSize: '0.8rem',
    fontWeight: '600'
  },
  tagLang: {
    background: 'rgba(0, 212, 255, 0.2)',
    border: '1px solid #00d4ff',
    color: '#00d4ff'
  },
  skillSection: {
    marginBottom: '1rem',
    color: '#ccc'
  },
  verifiedStatus: {
    marginTop: '1rem',
    padding: '0.5rem',
    textAlign: 'center',
    borderRadius: '5px',
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  
  verifyBtn: {
    width: '100%',
    padding: '0.75rem',
    background: '#00ff88',
    color: '#0a0a0a',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: '1rem',
    fontFamily: '"Courier New", monospace'
  },
  addBtn: {
    padding: '0.75rem 1.5rem',
    background: '#00ff88',
    color: '#0a0a0a',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: '"Courier New", monospace'
  },
  filterButtons: {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '2rem',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '0.6rem 1.2rem',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '2px solid #00ff88',
    color: '#00ff88',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: '"Courier New", monospace'
  },
  filterBtnActive: {
    background: '#00ff88',
    color: '#0a0a0a'
  },
  mapGrid: {
    display: 'grid',
    gap: '1rem'
  },
  mapItem: {
    background: 'rgba(0, 0, 0, 0.5)',
    border: '2px solid #00ff88',
    borderRadius: '8px',
    padding: '1.5rem',
    animation: 'slideIn 0.5s ease-out forwards'
  },
  mapHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  mapName: {
    fontSize: '1.1rem',
    color: '#00ff88',
    fontWeight: '700',
    textTransform: 'uppercase'
  },
  mapCount: {
    fontSize: '1.2rem',
    color: '#00d4ff',
    fontWeight: '700'
  },
  mapBar: {
    height: '12px',
    background: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '6px',
    overflow: 'hidden',
    border: '1px solid #00ff88'
  },
  mapFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #00ff88, #00d4ff)',
    transition: 'width 1s ease-out',
    boxShadow: '0 0 10px #00ff88'
  },
  profileCard: {
    background: 'rgba(0, 0, 0, 0.8)',
    border: '2px solid #00ff88',
    borderRadius: '10px',
    padding: '2rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  profileAvatar: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #00ff88, #00d4ff)',
    color: '#0a0a0a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    margin: '0 auto 1.5rem',
    animation: 'neonGlow 2s infinite'
  },
  profileName: {
    fontSize: '2rem',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    textShadow: '0 0 10px #00ff88'
  },
  profileEmail: {
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '1rem'
  },
  profileDetails: {
    display: 'grid',
    gap: '2rem'
  },
  profileSection: {
    paddingBottom: '1rem',
    borderBottom: '1px solid rgba(0, 255, 136, 0.3)'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.9)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  modal: {
    background: 'rgba(10, 10, 10, 0.95)',
    border: '2px solid #00ff88',
    borderRadius: '10px',
    padding: '2rem',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '90vh',
    overflowY: 'auto'
  },
  modalTitle: {
    fontSize: '1.8rem',
    color: '#00ff88',
    marginBottom: '0.5rem',
    textAlign: 'center',
    textTransform: 'uppercase',
    textShadow: '0 0 10px #00ff88'
  },
  modalEndpoint: {
    fontSize: '0.85rem',
    color: '#00d4ff',
    textAlign: 'center',
    marginBottom: '1.5rem',
    fontFamily: '"Courier New", monospace'
  },
  modalButtons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  submitBtn: {
    flex: 1,
    padding: '0.75rem',
    background: '#00ff88',
    color: '#0a0a0a',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: '"Courier New", monospace'
  },
  cancelBtn: {
    flex: 1,
    padding: '0.75rem',
    background: 'transparent',
    border: '2px solid #ff0088',
    color: '#ff0088',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '700',
    textTransform: 'uppercase',
    fontFamily: '"Courier New", monospace'
  },
  // AJOUTE CES NOUVEAUX STYLES À LA FIN, APRÈS cancelBtn
  talentCirclesGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  gap: '2rem',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem'
},

}