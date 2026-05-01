export default function Footer() {
  return (
    <footer className="footer p-10 mx-auto bg-base-200 shadow-md sticky text-base-content mt-auto flex justify-between gap-4">
      <div>
        <span className="footer-title">SkillSphere</span>
        <p> hello@skillsphere.com</p>
        <p>2026 All rights reserved</p>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <a className="link">Facebook</a>
        <a className="link">GitHub</a>
        <a className="link">LinkedIn</a>
      </div>
      <div>
        <span className="footer-title">Legal</span>
        <a className="link">Terms & Conditions</a>
        <a className="link">Privacy Policy</a>
      </div>
    </footer>
  )
}