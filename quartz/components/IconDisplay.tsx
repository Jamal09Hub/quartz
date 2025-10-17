import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"
import { classNames } from "../util/lang"

interface LogoTitleOptions {
  /**
   * Path to your logo image
   */
  logoSrc?: string
  /**
   * Alt text for the logo (accessibility)
   */
  altText?: string
  /**
   * Height of the logo in pixels
   */
  logoHeight?: number
  /**
   * Width of the logo in pixels (optional - will auto-calculate if not provided)
   */
  logoWidth?: number
  /**
   * Whether the logo should link to home page
   */
  linkToHome?: boolean
}

const defaultOptions: LogoTitleOptions = {
  logoSrc: "/static/dhclogotext.png",             // REPLACE THIS with your logo path
  altText: "Site Logo",
  logoHeight: 40,                          // Default height in pixels
  logoWidth: undefined,                    // Auto-calculate width to maintain aspect ratio
  linkToHome: true
}

export default ((userOpts?: Partial<LogoTitleOptions>) => {
  const opts: LogoTitleOptions = { ...defaultOptions, ...userOpts }
  
  const LogoTitle: QuartzComponent = ({ 
    fileData, 
    cfg, 
    displayClass 
  }: QuartzComponentProps) => {
    const baseDir = pathToRoot(fileData.slug!)
    const logoPath = `${baseDir}${opts.logoSrc?.startsWith('/') ? opts.logoSrc.slice(1) : opts.logoSrc}`
    
    const logoElement = (
      <img
        src={logoPath}                       // PLACEHOLDER - replace with your logo
        alt={opts.altText}
        className="site-logo"
        style={{
          height: `${opts.logoHeight}px`,
          width: opts.logoWidth ? `${opts.logoWidth}px` : 'auto'
        }}
        loading="eager"                      // Load immediately since it's above the fold
      />
    )
    
    return (
      <div className={classNames(displayClass, "logo-title-container")}>
        {opts.linkToHome ? (
          <a href={baseDir} className="logo-link">
            {logoElement}
          </a>
        ) : (
          logoElement
        )}
      </div>
    )
  }
  
  LogoTitle.css = `
    /* Main container for the logo */
    .logo-title-container {
      display: flex;                         /* Flexbox for alignment */
      align-items: center;                   /* Center vertically */
      margin: 0;                             /* Remove default margins */
      padding: 0.5rem 0;                     /* Small vertical padding */
    }
    
    /* Logo link styling (if clickable) */
    .logo-title-container .logo-link {
      display: inline-flex;                  /* Inline flex for proper alignment */
      align-items: center;                   /* Center the logo vertically */
      text-decoration: none;                 /* Remove link underline */
      transition: opacity 0.2s ease;         /* Smooth hover transition */
    }
    
    .logo-title-container .logo-link:hover {
      opacity: 0.8;                          /* Slightly fade on hover */
    }
    
    /* Logo image styling */
    .logo-title-container .site-logo {
      display: block;                        /* Block display for proper sizing */
      max-width: 100%;                       /* Responsive - don't exceed container */
      height: auto;                          /* Maintain aspect ratio */
      object-fit: contain;                   /* Fit within bounds while maintaining ratio */
    }
    
    /* Responsive adjustments */
    @media (max-width: 800px) {
      .logo-title-container {
        padding: 0.25rem 0;                  /* Less padding on mobile */
      }
      
      .logo-title-container .site-logo {
        max-height: 32px;                    /* Smaller logo on mobile */
      }
    }
    
    @media (max-width: 500px) {
      .logo-title-container .site-logo {
        max-height: 28px;                    /* Even smaller on very small screens */
      }
    }
    
    /* High DPI display support */
    @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
      .logo-title-container .site-logo {
        image-rendering: -webkit-optimize-contrast; /* Better rendering on retina */
        image-rendering: crisp-edges;
      }
    }
  `
  
  return LogoTitle
}) satisfies QuartzComponentConstructor