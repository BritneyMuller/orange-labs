import { Link } from 'react-router-dom'
import styles from './Home.module.css'

/* ── Small reusable pieces ───────────────────────────────── */

function Avatar({ initials, bg, className }) {
  return (
    <div className={className} style={{ background: bg }}>
      {initials}
    </div>
  )
}

function FeedItem({ badge, badgeClass, badgeIcon, time, authorInitials, authorBg, authorName, desc }) {
  return (
    <div className={styles.feedItem}>
      <div className={styles.feedItemTop}>
        <span className={`${styles.feedItemBadge} ${styles[badgeClass]}`}>
          {badgeIcon} {badge}
        </span>
        <span className={styles.feedItemTime}>{time}</span>
      </div>
      <div className={styles.feedItemContent}>
        <Avatar
          initials={authorInitials}
          bg={authorBg}
          className={styles.feedItemAvatar}
        />
        <div className={styles.feedItemText}>
          <div className={styles.feedItemAuthor}>{authorName}</div>
          <div className={styles.feedItemDesc}>{desc}</div>
        </div>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────────── */

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ====================================================
          1. STICKY NAV
          ==================================================== */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <Link to="/" className={styles.navLogo}>
            <span className={styles.navLogoDot}>●</span>
            orange labs
          </Link>
          <div className={styles.navRight}>
            <Link to="/community" className={styles.navLink}>Community</Link>
            <Link to="/courses"   className={styles.navLink}>Courses</Link>
            <Link to="/enterprise" className={styles.navLink}>Enterprise</Link>
            <button className={styles.navCta}>Join the Lab →</button>
          </div>
        </div>
      </nav>

      {/* ====================================================
          2. HERO
          ==================================================== */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>

          {/* Left */}
          <div className={styles.heroLeft}>
            <div className={styles.heroPill}>
              <span className={styles.heroPillDot} />
              <span className={styles.heroPillText}>Live Community</span>
            </div>

            <h1 className={styles.heroTitle}>
              The Community For Marketers Who{' '}
              <span className={styles.heroTitleAccent}>Build With AI</span>
            </h1>

            <p className={styles.heroSub}>
              More than a course. A hands-on lab where marketers build real AI
              tools, share wins, and stay ahead — together.
            </p>

            <div className={styles.heroActions}>
              <a href="#inside" className={styles.heroCta}>
                Join the Lab →
              </a>
              <a href="#inside" className={styles.heroGhost}>
                See what's inside ↓
              </a>
            </div>

            <div className={styles.heroSocialProof}>
              <div className={styles.heroAvatars}>
                {[
                  { i: 'AT', bg: '#6366f1' },
                  { i: 'JK', bg: '#0ea5e9' },
                  { i: 'MR', bg: '#10b981' },
                  { i: 'SL', bg: '#f59e0b' },
                  { i: 'PR', bg: '#ec4899' },
                ].map((a, idx) => (
                  <Avatar
                    key={idx}
                    initials={a.i}
                    bg={a.bg}
                    className={styles.heroAvatar}
                  />
                ))}
              </div>
              <p className={styles.heroSocialText}>
                <span className={styles.heroSocialTextBold}>200+ marketers</span>{' '}
                already building with AI
              </p>
            </div>
          </div>

          {/* Right — Feed mockup */}
          <div className={styles.heroRight}>
            <div className={styles.feedMockup}>
              <div className={styles.feedHeader}>
                <span className={styles.feedTitle}>Community Feed</span>
                <span className={styles.feedLiveBadge}>
                  <span className={styles.feedLiveDot} />
                  <span className={styles.feedLiveText}>Live</span>
                </span>
              </div>

              <FeedItem
                badge="Member Win"
                badgeClass="feedItemBadgeWin"
                badgeIcon="🏆"
                time="2h ago"
                authorInitials="MJ"
                authorBg="#e8500a"
                authorName="Martin J."
                desc="Just shipped my first AI content pipeline — cutting 6 hours of work down to 20 minutes."
              />

              <FeedItem
                badge="Live Hackathon"
                badgeClass="feedItemBadgeLive"
                badgeIcon="🔴"
                time="Now"
                authorInitials="BM"
                authorBg="#6366f1"
                authorName="Britney M."
                desc="Join me live: Build an AI SEO audit tool from scratch — no dev skills needed."
              />

              <FeedItem
                badge="New Resource"
                badgeClass="feedItemBadgeResource"
                badgeIcon="📚"
                time="5h ago"
                authorInitials="EH"
                authorBg="#10b981"
                authorName="Elizabeth H."
                desc="Shared: The Prompt Playbook for Marketers — 40 battle-tested prompts you can steal today."
              />
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          3. WHAT IS ORANGE LABS?
          ==================================================== */}
      <section className={styles.whatSection}>
        <div className={styles.whatInner}>
          <div className={styles.whatIntro}>
            <span className={styles.eyebrow}>What is Orange Labs?</span>
            <h2 className={styles.sectionHeadline}>
              Not just content.<br />A working lab.
            </h2>
            <p className={styles.sectionParagraph}>
              Orange Labs is where marketers stop watching tutorials and start
              shipping real AI tools. Every track is built around doing — with
              a community, curriculum, and cadence to keep you moving.
            </p>
          </div>

          <div className={styles.whatCards}>
            {[
              {
                icon: '🧪',
                tag: 'The Core',
                title: 'Community Lab',
                desc: 'A live, active community of marketers building with AI every week. Share wins, get feedback, and never build alone.',
              },
              {
                icon: '⚡',
                tag: 'Accelerator',
                title: 'Actionable AI Course',
                desc: 'A structured curriculum that takes you from prompt basics to building full AI workflows — with real deliverables at every step.',
              },
              {
                icon: '🏢',
                tag: 'For Teams',
                title: 'Enterprise Training',
                desc: 'Bring AI fluency to your entire marketing team with cohort-based workshops tailored to your stack and goals.',
              },
            ].map((card) => (
              <div key={card.tag} className={styles.whatCard}>
                <div className={styles.whatCardIcon}>{card.icon}</div>
                <span className={styles.whatCardTag}>{card.tag}</span>
                <h3 className={styles.whatCardTitle}>{card.title}</h3>
                <p className={styles.whatCardDesc}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          4. WHY MARKETERS STAY STUCK
          ==================================================== */}
      <section className={styles.whySection}>
        <div className={styles.whyInner}>
          <div className={styles.whyIntro}>
            <span className={styles.eyebrow}>The Problem</span>
            <h2 className={styles.sectionHeadline}>
              Why most marketers stay stuck on AI
            </h2>
          </div>

          <div className={styles.whyCards}>
            {[
              {
                tag: 'The Trap',
                title: 'Endless tutorials, zero results',
                desc: 'You\'ve watched the YouTube videos, read the LinkedIn posts, even taken a course or two. But you still don\'t have a single AI tool in production.',
                fix: 'We give you real projects to ship — not more theory to watch.',
              },
              {
                tag: 'The Struggle',
                title: 'No one to learn from or with',
                desc: 'AI moves fast and most of your colleagues are in the same boat. Figuring it out alone means slow progress and a lot of wasted time.',
                fix: 'A community of builders who share what works, what doesn\'t, and what\'s next.',
              },
              {
                tag: 'The Barrier',
                title: 'AI moves too fast to keep up',
                desc: 'By the time you\'ve learned one tool, three new ones have launched. The overwhelm is real, and it keeps you from making any real progress.',
                fix: 'Weekly sessions surface only what matters — so you stay current without the noise.',
              },
            ].map((card) => (
              <div key={card.tag} className={styles.whyCard}>
                <span className={styles.whyCardTag}>{card.tag}</span>
                <h3 className={styles.whyCardTitle}>{card.title}</h3>
                <p className={styles.whyCardDesc}>{card.desc}</p>
                <div className={styles.whyCardFix}>
                  <span className={styles.whyCardFixLabel}>The Fix</span>
                  {card.fix}
                </div>
              </div>
            ))}
          </div>

          {/* Enrollment Banner */}
          <div className={styles.enrollBanner}>
            <div className={styles.enrollBannerLeft}>
              <span className={styles.enrollDot} />
              <div>
                <div className={styles.enrollText}>Open enrollment — new members joining daily</div>
                <div className={styles.enrollSubText}>No waitlist. Cancel any time. Start building today.</div>
              </div>
            </div>
            <a href="#inside" className={styles.enrollCta}>
              Join the Lab →
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================
          5. INSIDE THE COMMUNITY
          ==================================================== */}
      <section className={styles.insideSection} id="inside">
        <div className={styles.insideInner}>
          <div className={styles.insideHeader}>
            <div className={styles.insideHeaderLeft}>
              <span className={styles.eyebrow}>Inside Orange Labs</span>
              <h2 className={styles.sectionHeadline}>
                Everything you need to build
              </h2>
            </div>
            <a href="#results" className={styles.insideCta}>
              <span className={styles.insideCtaPrice}>$49/mo</span>&nbsp;— Get Started →
            </a>
          </div>

          <div className={styles.featureGrid}>
            {[
              {
                icon: '🎯',
                title: 'Hackathon Sessions',
                desc: 'Monthly live builds where the whole community ships a real AI tool together. Learn by doing — not by watching.',
              },
              {
                icon: '🔧',
                title: 'Hands-On Implementation',
                desc: 'Step-by-step workflows built around real marketing jobs. Copy the process, adapt it to your stack, and ship it.',
              },
              {
                icon: '📚',
                title: "The 'Steal This' Library",
                desc: 'A growing vault of prompts, templates, and SOPs shared by real marketers. Everything is plug-and-play.',
              },
              {
                icon: '🤝',
                title: 'A Network of AI Builders',
                desc: 'Connect with marketers who are actually doing it — not just talking about it. Get feedback, find collaborators, stay sharp.',
              },
            ].map((f) => (
              <div key={f.title} className={styles.featureCard}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          6. REAL RESULTS
          ==================================================== */}
      <section className={styles.resultsSection} id="results">
        <div className={styles.resultsInner}>

          {/* Left — Numbered benefits */}
          <div className={styles.resultsLeft}>
            <div className={styles.resultsLeftIntro}>
              <span className={styles.eyebrow}>Real Results</span>
              <h2 className={styles.sectionHeadline}>
                What changes when you stop learning and start building
              </h2>
            </div>

            <div className={styles.resultsList}>
              {[
                {
                  n: '01',
                  title: 'Build tools without a dev team',
                  desc: 'Use no-code AI stacks to ship content pipelines, audit tools, and workflow automations — all on your own.',
                },
                {
                  n: '02',
                  title: 'Get unstuck in minutes',
                  desc: 'Post your problem to the community and get real answers from people who\'ve already solved it.',
                },
                {
                  n: '03',
                  title: 'Stay current without the noise',
                  desc: 'We curate the signal so you only see what actually matters for marketers — no endless scrolling required.',
                },
              ].map((item) => (
                <div key={item.n} className={styles.resultsItem}>
                  <div className={styles.resultsNumber}>{item.n}</div>
                  <div className={styles.resultsItemText}>
                    <div className={styles.resultsItemTitle}>{item.title}</div>
                    <div className={styles.resultsItemDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Quotes panel */}
          <div className={styles.quotesPanel}>
            <div className={styles.quotePanelHeader}>Member Stories</div>

            {[
              {
                initials: 'LT',
                bg: '#6366f1',
                quote: 'The hackathon sessions alone paid for my membership 10x over. I shipped an AI tool that saves me 4 hours every week.',
                name: 'Luke T.',
                role: 'Content Strategist',
              },
              {
                initials: 'GR',
                bg: '#0ea5e9',
                quote: 'I went from "AI curious" to actually building in three weeks. The community kept me accountable when I would have quit.',
                name: 'Glen R.',
                role: 'Marketing Director',
              },
              {
                initials: 'SM',
                bg: '#10b981',
                quote: 'This is the only community where people share what\'s actually working — not just AI hype. Immediately useful.',
                name: 'Stefan M.',
                role: 'Freelance Marketer',
              },
            ].map((q) => (
              <div key={q.name} className={styles.quoteItem}>
                <p className={styles.quoteText}>"{q.quote}"</p>
                <div className={styles.quoteAuthor}>
                  <Avatar initials={q.initials} bg={q.bg} className={styles.quoteAvatar} />
                  <div className={styles.quoteAuthorInfo}>
                    <span className={styles.quoteAuthorName}>{q.name}</span>
                    <span className={styles.quoteAuthorRole}>{q.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ====================================================
          7. TESTIMONIALS
          ==================================================== */}
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsInner}>
          <div className={styles.testimonialsIntro}>
            <span className={styles.eyebrow}>200+ Members &amp; Growing</span>
            <h2 className={styles.sectionHeadline}>Don't take our word for it</h2>
            <p className={styles.sectionParagraph}>
              Marketers at every level — from freelancers to directors — are
              building real AI tools inside Orange Labs every week.
            </p>
          </div>

          <div className={styles.testimonialsGrid}>
            {[
              {
                initials: 'LH', bg: '#6366f1',
                name: 'Luke H.', role: 'Head of Search',
                quote: "I've tried every AI course out there. Orange Labs is the only one where I actually ship things. The hackathon format changed how I learn.",
              },
              {
                initials: 'BD', bg: '#0ea5e9',
                name: 'Bhushan D.', role: 'Digital Marketing Manager',
                quote: "Within two weeks I had an AI content brief tool running in production. My team thinks I hired a developer. I just joined Orange Labs.",
              },
              {
                initials: 'SM', bg: '#10b981',
                name: 'Stefan M.', role: 'Senior SEO Manager',
                quote: "The community alone is worth it. Real practitioners sharing what's working right now — not recycled LinkedIn takes about AI being the future.",
              },
              {
                initials: 'EH', bg: '#f59e0b',
                name: 'Elizabeth H.', role: 'Director of SEO',
                quote: "Britney built this for people who are serious about using AI to do real work. It shows in every session, every resource, every interaction.",
              },
              {
                initials: 'GR', bg: '#ec4899',
                name: 'Glen R.', role: 'SEO Freelancer',
                quote: "As a freelancer I can't afford to fall behind. Orange Labs keeps me ahead of my clients — and gives me tools I can bill for immediately.",
              },
              {
                initials: 'MW', bg: '#e8500a',
                name: 'Mike W.', role: 'Web & Strategy Director',
                quote: "I was skeptical of AI communities after a few duds. This one is different. Less hype, more doing. My whole workflow has changed in 60 days.",
              },
            ].map((t) => (
              <div key={t.name} className={styles.testimonialCard}>
                <div className={styles.testimonialStars}>★★★★★</div>
                <p className={styles.testimonialQuote}>"{t.quote}"</p>
                <div className={styles.testimonialAuthor}>
                  <Avatar initials={t.initials} bg={t.bg} className={styles.testimonialAvatar} />
                  <div>
                    <div className={styles.testimonialName}>{t.name}</div>
                    <div className={styles.testimonialRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          8. WHO IS BRITNEY
          ==================================================== */}
      <section className={styles.whoSection}>
        <div className={styles.whoInner}>

          <div className={styles.whoImageWrap}>
            <div className={styles.whoImagePlaceholder}>
              <Avatar initials="BM" bg="#E8500A" className={styles.whoImageAvatar} />
            </div>
            <div className={styles.whoImageOverlay}>
              <div className={styles.whoOverlayName}>Britney Muller</div>
              <div className={styles.whoOverlayTitle}>Founder, Orange Labs</div>
            </div>
          </div>

          <div className={styles.whoRight}>
            <span className={styles.eyebrow}>Your Instructor &amp; Community Leader</span>
            <h2 className={`${styles.sectionHeadline} ${styles.sectionHeadlineLight}`}>
              Learn from a practitioner, not a professor
            </h2>
            <p className={`${styles.sectionParagraph} ${styles.sectionParagraphLight}`}>
              Britney Muller has spent over a decade at the intersection of
              marketing, data, and emerging technology. She built and led SEO
              at Moz, has spoken at BrightonSEO, and has been training AI models
              long before "prompt engineering" was a job title. Orange Labs is
              her way of sharing what actually works — with practitioners who
              need to ship, not just learn.
            </p>

            <ul className={styles.whoCredentials}>
              {[
                'Certified Hugging Face machine learning practitioner',
                'Former Head of SEO Content at Moz',
                '10+ years applying ML & AI to real marketing problems',
                'International speaker — BrightonSEO & beyond',
              ].map((c) => (
                <li key={c} className={styles.whoCredItem}>
                  <span className={styles.whoCredCheck}>✓</span>
                  {c}
                </li>
              ))}
            </ul>

            <div className={styles.whoLogos}>
              {['Hugging Face', 'Moz', 'BrightonSEO', 'Semrush'].map((logo) => (
                <span key={logo} className={styles.whoLogoPill}>{logo}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ====================================================
          9. UPSELLS
          ==================================================== */}
      <section className={styles.upsellsSection}>
        <div className={styles.upsellsInner}>
          <div className={styles.upsellsIntro}>
            <span className={styles.eyebrow}>Need More Than the Community?</span>
            <h2 className={styles.sectionHeadline}>Go deeper when you're ready</h2>
            <p className={styles.sectionParagraph}>
              The community is the foundation. When you're ready to accelerate
              — or bring your whole team — we have a track for that.
            </p>
          </div>

          <div className={styles.upsellCards}>

            <div className={styles.upsellCard}>
              <div className={styles.upsellCardTag}>Accelerator</div>
              <div className={styles.upsellCardTitle}>Actionable AI Course</div>
              <div className={styles.upsellCardPrice}>
                <span className={styles.upsellPriceAmount}>$1,495</span>
                <span className={styles.upsellPricePer}> / cohort</span>
              </div>
              <ul className={styles.upsellList}>
                {[
                  '8-week cohort with live weekly sessions',
                  'Build 4 production-ready AI marketing tools',
                  'Private cohort Slack channel + instructor access',
                  'Lifetime access to course materials & recordings',
                  'Certificate of completion + community badge',
                ].map((item) => (
                  <li key={item} className={styles.upsellListItem}>
                    <span className={styles.upsellCheck}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <div className={styles.upsellCohort}>
                Next cohort: <strong>April 14, 2025</strong> — 6 spots left
              </div>
              <a href="#" className={styles.upsellCtaSolid}>Save My Seat →</a>
            </div>

            <div className={`${styles.upsellCard} ${styles.upsellCardDark}`}>
              <div className={`${styles.upsellCardTag} ${styles.upsellCardTagLight}`}>For Teams</div>
              <div className={`${styles.upsellCardTitle} ${styles.upsellCardTitleLight}`}>Enterprise Training</div>
              <div className={styles.upsellCardPrice}>
                <span className={`${styles.upsellPriceAmount} ${styles.upsellPriceAmountLight}`}>$39,900</span>
                <span className={`${styles.upsellPricePer} ${styles.upsellPricePerLight}`}> / team engagement</span>
              </div>
              <ul className={styles.upsellList}>
                {[
                  'Custom workshop designed for your team & stack',
                  'Up to 20 participants per engagement',
                  'Private community channel for your organization',
                  'Tailored curriculum + real deliverables your team ships',
                  '90-day follow-up support & implementation review',
                ].map((item) => (
                  <li key={item} className={`${styles.upsellListItem} ${styles.upsellListItemLight}`}>
                    <span className={styles.upsellCheckLight}>✓</span>{item}
                  </li>
                ))}
              </ul>
              <div className={`${styles.upsellCohort} ${styles.upsellCohortLight}`}>
                Questions?{' '}
                <a href="mailto:hello@orangelabs.co" className={styles.upsellEmailLink}>hello@orangelabs.co</a>
              </div>
              <a href="#" className={styles.upsellCtaOutline}>Apply Now — 2 Spots Left →</a>
            </div>

          </div>
        </div>
      </section>

      {/* ====================================================
          10. FAQ
          ==================================================== */}
      <section className={styles.faqSection}>
        <div className={styles.faqInner}>
          <div className={styles.faqIntro}>
            <span className={styles.eyebrow}>FAQ</span>
            <h2 className={styles.sectionHeadline}>Common questions</h2>
          </div>

          <div className={styles.faqGrid}>
            {[
              {
                q: "I'm not technical. Is this for me?",
                a: "Absolutely. Orange Labs is built for marketers, not developers. Everything we teach uses no-code and low-code tools. If you can use Google Docs, you can build with AI here.",
              },
              {
                q: 'Can I expense this?',
                a: "Most members do. Orange Labs is professional development for your marketing career. At $49/month, it's easier to justify than most SaaS subscriptions — and you'll actually use it.",
              },
              {
                q: 'What if I join the community and later want the course?',
                a: 'Community members get priority access and a discounted rate on the next cohort. Your membership is a great way to try before you invest in the full accelerator.',
              },
              {
                q: 'How is this different from other AI content?',
                a: 'Most AI content is either too theoretical or too generic. Orange Labs is built around shipping real things — every session ends with something you can use or deploy. No fluff, no hype.',
              },
            ].map((item) => (
              <div key={item.q} className={styles.faqItem}>
                <div className={styles.faqQuestion}>{item.q}</div>
                <p className={styles.faqAnswer}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          11. FINAL CTA
          ==================================================== */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaInner}>
          <span className={styles.eyebrow}>Ready to build?</span>
          <h2 className={styles.ctaHeadline}>
            Join the lab.{' '}
            <em className={styles.ctaHeadlineItalic}>Start building.</em>
          </h2>
          <p className={styles.ctaSub}>
            200+ marketers already inside — shipping AI tools, sharing wins,
            and staying ahead together.
          </p>
          <div className={styles.ctaButtons}>
            <a href="#inside" className={styles.ctaBtnWhite}>
              Join the Community — $49/mo →
            </a>
            <a href="#" className={styles.ctaBtnGhost}>Explore the Course</a>
          </div>
          <p className={styles.ctaGuarantee}>Cancel any time. No contracts. No risk.</p>
        </div>
      </section>

      {/* ====================================================
          12. FOOTER
          ==================================================== */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerLogo}>
            <span className={styles.navLogoDot}>●</span> orange labs
          </div>
          <p className={styles.footerCopy}>
            © {new Date().getFullYear()} Orange Labs. All rights reserved.{' '}
            <a href="mailto:hello@orangelabs.co" className={styles.footerLink}>
              hello@orangelabs.co
            </a>
          </p>
        </div>
      </footer>

    </div>
  )
}
