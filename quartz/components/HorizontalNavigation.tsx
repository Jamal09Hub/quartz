import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { classNames } from "../util/lang"

interface HorizontalNavigationOptions {
  /**
   * Whether to show the current page as active
   */
  showActiveState: boolean
  /**
   * Navigation items to display
   */
  items: NavItem[]
}

interface NavItem {
  displayName: string
  path: string
  external?: boolean
}

const defaultOptions: HorizontalNavigationOptions = {
  showActiveState: true,
  items: [
    { displayName: "Home", path: "/" },
    { displayName: "About", path: "/About" },
  ]
}

export default ((userOpts?: Partial<HorizontalNavigationOptions>) => {
  const opts: HorizontalNavigationOptions = { ...defaultOptions, ...userOpts }
  
  const HorizontalNavigation: QuartzComponent = ({ 
    fileData, 
    displayClass 
  }: QuartzComponentProps) => {
    const currentSlug = fileData.slug || ""
    
    return (
      <nav className={classNames(displayClass, "horizontal-navigation")}>
        <ul className="nav-list">
          {opts.items.map((item, index) => {
            const isActive = opts.showActiveState && 
              (currentSlug === item.path.replace(/^\//, "") || 
               (item.path === "/" && currentSlug === "index"))
            
            return (
              <li key={index} className="nav-item">
                <a 
                  href={item.external ? item.path : resolveRelative(fileData.slug!, item.path as SimpleSlug)}
                  className={classNames("nav-link", { "active": isActive })}
                  {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {item.displayName}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    )
  }
  
  HorizontalNavigation.css = `
    .horizontal-navigation {
      background-color: var(--light);
      border-bottom: 1px solid var(--lightgray);
      padding: 0;
      margin-bottom: 1rem;

      max-width: 1200px;                     /* Maximum width of navigation bar */
      margin-left: auto;                     /* Auto margin pushes container to center */
      margin-right: auto;                    /* Auto margin pushes container to center */
      width: 100%;                           /* Full width up to max-width */
    }
    
    .horizontal-navigation .nav-list {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;
      justify-content: center;
    }
    
    .horizontal-navigation .nav-item {
      margin: 0;
    }
    
    .horizontal-navigation .nav-link {
      display: block;
      padding: 1rem 1.5rem;
      text-decoration: none;
      color: var(--dark);
      font-weight: 500;
      transition: all 0.2s ease;
      border-bottom: 3px solid transparent;
    }
    
    .horizontal-navigation .nav-link:hover {
      background-color: var(--highlight);
      color: var(--dark);
    }
    
    .horizontal-navigation .nav-link.active {
      color: var(--secondary);
      border-bottom-color: var(--secondary);
      background-color: var(--highlight);
    }
    
    @media (max-width: 800px) {
      .horizontal-navigation .nav-list {
        flex-direction: column;
        align-items: stretch;
      }
      
      .horizontal-navigation .nav-link {
        text-align: center;
        padding: 0.75rem 1rem;
      }
    }
  `
  
  return HorizontalNavigation
}) satisfies QuartzComponentConstructor
