import { Link } from "react-router-dom"
import { Palette, Twitter, Github, DiscIcon as Discord } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-card border-t border-custom">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-[#00d2ff]" />
              <span className="text-[var(--text-primary)] font-bold text-xl">BlockCanvas</span>
            </Link>
            <p className="mt-4 text-sm text-[var(--text-secondary)] max-w-md">
              BlockCanvas is the premier platform for NFT discovery, collection, and trading. Explore unique digital
              assets secured on the blockchain.
            </p>
            <div className="flex space-x-6 mt-6">
              <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] tracking-wider uppercase">Resources</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                  Tutorials
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                  Blog
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-[var(--text-secondary)] hover:text-[#00d2ff]">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-custom">
          <p className="text-center text-[var(--text-secondary)] text-sm">
            &copy; {new Date().getFullYear()} BlockCanvas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

