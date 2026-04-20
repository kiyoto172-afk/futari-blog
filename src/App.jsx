import { useState, useEffect } from 'react';
import { INITIAL_POSTS, CATEGORIES, TAGS } from './posts';

// ===== HEADER =====
function Header({ page, setPage, scrolled }) {
  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <div className="site-logo" onClick={() => setPage('home')}>
          <span className="logo-jp">ふたりの余白、沖縄日和</span>
          <span className="logo-en">Futari no Yohaku, Okinawa Biyori</span>
        </div>
        <nav className="site-nav">
          <ul>
            <li><button className={`nav-btn${page === 'home' ? ' active' : ''}`} onClick={() => setPage('home')}>ホーム</button></li>
            <li><button className={`nav-btn${page === 'blog' ? ' active' : ''}`} onClick={() => setPage('blog')}>ブログ</button></li>
            <li><button className="nav-btn" onClick={() => { setPage('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>わたしたちについて</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

// ===== HERO =====
function HeroSection({ setPage }) {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <img src="/images/hero-main.png" alt="沖縄を歩くふたり" className="hero-bg-img" />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-mensore">めんそーれ！</p>
          <h1 className="hero-catch">
            沖縄の風に吹かれながら、<br />
            <em>ふたりの日常をゆっくりと。</em>
          </h1>
          <p className="hero-sub">
            生まれ育った沖縄から、島の暮らし・グルメ・おでかけを<br />
            のんびり綴るブログです。
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => setPage('blog')}>記事を読む →</button>
            <a href="#about" className="btn-ghost">わたしたちについて</a>
          </div>
        </div>
      </div>
      <div className="hero-deco-wave">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,45 C240,90 480,0 720,45 C960,90 1200,10 1440,45 L1440,90 L0,90 Z" fill="oklch(0.98 0.02 75)" />
        </svg>
      </div>
    </section>
  );
}

// ===== ABOUT =====
function AboutSection() {
  return (
    <section className="about" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">About Us</span>
          <h2 className="section-title">わたしたちについて</h2>
          <div className="title-deco" />
        </div>
        <div className="about-inner">
          <div className="about-images">
            <div className="about-deco" />
            <div className="about-img-main">
              <img src="/images/couple-peace.jpg" alt="ふたり" />
            </div>
            <div className="about-img-sub">
              <img src="/images/profile-medallion.png" alt="プロフィール" />
            </div>
          </div>
          <div className="about-text">
            <p className="about-greeting">はじめまして。<br />沖縄在住のアラサー夫婦です。</p>
            <p>夫は食いしん坊。おいしいものとお酒のためなら<br />どこへでも行きます。バイクとテニスも大好きです。</p>
            <p>妻はのんびり屋。かわいいものや雑貨を見ると<br />ついつい立ち止まってしまいます。</p>
            <p>生まれ育った沖縄の好きなところを、<br />ふたりの目線でゆっくり発信していきます。</p>
            <p className="about-closing">どうぞよろしくお願いします。<br />めんそーれ🌺</p>
            <div className="about-tags">
              {['#沖縄', '#夫婦ブログ', '#沖縄ライフ', '#沖縄暮らし'].map(t => (
                <span className="tag" key={t}>{t}</span>
              ))}
            </div>
            <span className="link-more">もっと詳しく →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== CATEGORIES =====
function CategoriesSection({ onCategoryClick }) {
  return (
    <section className="categories" id="categories">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Categories</span>
          <h2 className="section-title">カテゴリ</h2>
          <div className="title-deco" />
        </div>
        <div className="category-grid">
          {CATEGORIES.map(cat => (
            <div className={`category-card ${cat.css}`} key={cat.id} onClick={() => onCategoryClick(cat.id)}>
              <div className="cat-icon">{cat.icon}</div>
              <h3>{cat.label}</h3>
              <p>{cat.desc}</p>
              <span className="cat-link">記事を見る →</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===== POST CARD =====
function PostCard({ post, onClick }) {
  return (
    <article className="post-card" onClick={() => onClick(post)}>
      <div className="post-card-img-wrap">
        <img src={post.image} alt={post.title} className="post-card-img" />
        <span className="post-category-badge">{post.category}</span>
      </div>
      <div className="post-card-body">
        <div className="post-meta">
          <span className="post-date">{post.date}</span>
        </div>
        <h3 className="post-title"><a>{post.title}</a></h3>
        <p className="post-excerpt">{post.excerpt}</p>
        <span className="post-read-more">もっと読む →</span>
      </div>
    </article>
  );
}

// ===== POSTS SECTION =====
function PostsSection({ posts, onPostClick, onGoToBlog }) {
  const featured = posts.find(p => p.featured);
  const rest = posts.filter(p => !p.featured).slice(0, 3);
  return (
    <section className="posts" id="posts">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Latest Posts</span>
          <h2 className="section-title">最近の記事</h2>
          <div className="title-deco" />
          <p className="section-sub">ふたりの島暮らし、少しずつ綴っています。</p>
        </div>
        {featured && (
          <div className="post-featured" onClick={() => onPostClick(featured)}>
            <img src={featured.image} alt={featured.title} className="post-featured-img" />
            <div className="post-featured-body">
              <span className="post-category-badge">{featured.category}</span>
              <h3 className="post-title">{featured.title}</h3>
              <p className="post-excerpt">{featured.excerpt}</p>
              <span className="post-read-more">もっと読む →</span>
            </div>
          </div>
        )}
        <div className="posts-grid">
          {rest.map(p => <PostCard key={p.id} post={p} onClick={onPostClick} />)}
        </div>
        <div className="posts-more-wrap">
          <button className="btn-primary" onClick={onGoToBlog}>すべての記事を見る →</button>
        </div>
      </div>
    </section>
  );
}

// ===== BLOG PAGE =====
function BlogPage({ posts, onPostClick, filterCategory, setFilterCategory }) {
  const filtered = filterCategory ? posts.filter(p => p.category === filterCategory) : posts;
  const catCounts = {};
  posts.forEach(p => { catCounts[p.category] = (catCounts[p.category] || 0) + 1; });
  return (
    <div className="page">
      <div className="blog-header">
        <h1>ブログ</h1>
        <p>沖縄の日常、綴っています。</p>
        <div className="blog-header-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.98 0.02 75)" />
          </svg>
        </div>
      </div>
      <div className="blog-body">
        <div className="container">
          <div className="blog-layout">
            <div className="blog-posts">
              {filtered.length === 0 && (
                <p style={{ color: 'var(--text-lt)', textAlign: 'center', padding: '40px' }}>記事がありません。</p>
              )}
              {filtered.map(post => (
                <div className="blog-post-card" key={post.id} onClick={() => onPostClick(post)}>
                  <img src={post.image} alt={post.title} className="blog-post-img" />
                  <div className="blog-post-body">
                    <div className="post-meta">
                      <span className="post-category-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '8px' }}>{post.category}</span>
                      <span className="post-date" style={{ marginLeft: '8px' }}>{post.date}</span>
                    </div>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.excerpt}</p>
                    <span className="post-read-more">もっと読む →</span>
                  </div>
                </div>
              ))}
            </div>
            <aside className="sidebar">
              <div className="sidebar-widget widget-profile">
                <p className="widget-title">このブログについて</p>
                <img src="/images/profile-medallion.png" alt="プロフィール" className="widget-profile-img" />
                <p>沖縄在住アラサー夫婦の<br />ゆったり島暮らし日記です。</p>
              </div>
              <div className="sidebar-widget">
                <p className="widget-title">カテゴリ</p>
                <div className="widget-cats">
                  <div
                    className="widget-cat"
                    onClick={() => setFilterCategory(null)}
                    style={!filterCategory ? { color: 'var(--orange)', fontWeight: 700 } : {}}
                  >
                    <span>すべて</span>
                    <span className="widget-cat-count">{posts.length}</span>
                  </div>
                  {CATEGORIES.map(cat => (
                    <div
                      className="widget-cat"
                      key={cat.id}
                      onClick={() => setFilterCategory(cat.id)}
                      style={filterCategory === cat.id ? { color: 'var(--orange)', fontWeight: 700 } : {}}
                    >
                      <span>{cat.icon} {cat.label}</span>
                      <span className="widget-cat-count">{catCounts[cat.id] || 0}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="sidebar-widget">
                <p className="widget-title">タグ</p>
                <div className="widget-tags">
                  {TAGS.map(t => (
                    <span className="widget-tag" key={t}>#{t}</span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===== ARTICLE PAGE =====
function ArticlePage({ post, posts, onBack, onPostClick }) {
  const related = posts.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  const paragraphs = post.body.split('\n\n');
  return (
    <div className="page">
      <div className="article-header">
        <div className="article-header-inner">
          <span className="article-header-badge">{post.category}</span>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.tags?.map(t => `#${t}`).join(' ')}</span>
          </div>
        </div>
        <div className="article-header-wave">
          <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="oklch(0.98 0.02 75)" />
          </svg>
        </div>
      </div>
      <div className="article-body-wrap">
        <img src={post.image} alt={post.title} className="article-hero-img" />
        <div className="article-body">
          {paragraphs.map((para, i) => <p key={i}>{para}</p>)}
        </div>
      </div>
      <div className="article-footer">
        <div className="article-body-wrap">
          <button className="article-back" onClick={onBack}>← 記事一覧に戻る</button>
          {related.length > 0 && (
            <div className="article-related">
              <div className="section-header" style={{ textAlign: 'left', marginBottom: '20px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', color: 'var(--orange-dk)' }}>関連記事</h3>
              </div>
              <div className="related-grid">
                {related.map(p => <PostCard key={p.id} post={p} onClick={onPostClick} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ===== FOOTER =====
function SiteFooter({ setPage }) {
  return (
    <footer className="site-footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="oklch(0.25 0.02 50)" />
        </svg>
      </div>
      <div className="footer-inner">
        <div className="footer-logo-row">
          <img src="/images/profile-medallion.png" alt="ふたり" className="footer-icon" />
          <div>
            <p className="footer-site-name">ふたりの余白、沖縄日和</p>
            <p className="footer-tagline">沖縄生まれのアラサー夫婦による、のんびり島暮らし日記。</p>
          </div>
        </div>
        <nav className="footer-nav">
          <ul>
            {['ホーム', 'ブログ', 'カテゴリ', 'わたしたちについて'].map(n => (
              <li key={n}><a onClick={() => setPage('home')}>{n}</a></li>
            ))}
          </ul>
        </nav>
        <p className="footer-copy">© 2025 ふたりの余白、沖縄日和</p>
      </div>
    </footer>
  );
}

// ===== APP =====
export default function App() {
  const [page, setPage] = useState(() => sessionStorage.getItem('oki_page') || 'home');
  const [posts] = useState(INITIAL_POSTS);
  const [currentPost, setCurrentPost] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [filterCategory, setFilterCategory] = useState(null);

  useEffect(() => {
    sessionStorage.setItem('oki_page', page);
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handlePostClick = (post) => {
    setCurrentPost(post);
    setPage('article');
  };

  const handleCategoryClick = (catId) => {
    setFilterCategory(catId);
    setPage('blog');
  };

  return (
    <>
      <Header page={page} setPage={setPage} scrolled={scrolled} />

      {page === 'home' && (
        <>
          <HeroSection setPage={setPage} />
          <AboutSection />
          <CategoriesSection onCategoryClick={handleCategoryClick} />
          <PostsSection posts={posts} onPostClick={handlePostClick} onGoToBlog={() => setPage('blog')} />
          <SiteFooter setPage={setPage} />
        </>
      )}

      {page === 'blog' && (
        <>
          <BlogPage
            posts={posts}
            onPostClick={handlePostClick}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
          />
          <SiteFooter setPage={setPage} />
        </>
      )}

      {page === 'article' && currentPost && (
        <>
          <ArticlePage
            post={currentPost}
            posts={posts}
            onBack={() => setPage('blog')}
            onPostClick={handlePostClick}
          />
          <SiteFooter setPage={setPage} />
        </>
      )}

    </>
  );
}
