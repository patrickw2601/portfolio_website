import { motion, useReducedMotion } from 'framer-motion'
import { AboutSection } from './components/AboutSection'
import { ContactSection } from './components/ContactSection'
import { EducationSection } from './components/EducationSection'
import { FlowPrinciples } from './components/FlowPrinciples'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { ProjectsFlow } from './components/ProjectsFlow'
import { ScrollProgress } from './components/ScrollProgress'
import { ScrollStage } from './components/ScrollStage'
import { SmoothScroll } from './components/SmoothScroll'
import { TimelineSection } from './components/TimelineSection'
import { organizations, site, workExperience } from './data/site'
import { springSoft } from './lib/motionPresets'

function App() {
  const reduce = useReducedMotion()
  const heroShell = reduce
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2 } },
      }
    : {
        hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
        show: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: { ...springSoft, stiffness: 260 },
        },
      }

  return (
    <SmoothScroll>
      <div className="relative min-h-screen overflow-x-hidden">
        <div className="flow-backdrop" aria-hidden />
        <ScrollProgress />
        <Nav />
        <main className="flow-main pb-16 md:pb-24">
          <motion.div
            variants={heroShell}
            initial="hidden"
            animate="show"
            className="relative z-10 flex flex-col"
          >
            <Hero />
          </motion.div>
          <ScrollStage reveal={false} panelId="principles">
            <FlowPrinciples />
          </ScrollStage>
          <ScrollStage panelId="about">
            <AboutSection />
          </ScrollStage>
          <ScrollStage panelId="education">
            <EducationSection />
          </ScrollStage>
          <ScrollStage panelId="work">
            <TimelineSection
              eyebrow="Career"
              title="Work experience"
              description="Internships, part-time roles, and upcoming programs."
              entries={workExperience}
              stats={site.stats}
              tone="emphasis"
            />
          </ScrollStage>
          <ScrollStage panelId="orgs">
            <TimelineSection
              eyebrow="Organizations"
              title="Clubs & leadership."
              entries={organizations}
              stats={site.orgStats}
            />
          </ScrollStage>
          <ScrollStage panelId="projects">
            <ProjectsFlow />
          </ScrollStage>
          <ScrollStage panelId="contact" reveal={false}>
            <ContactSection />
          </ScrollStage>
        </main>
      </div>
    </SmoothScroll>
  )
}

export default App
