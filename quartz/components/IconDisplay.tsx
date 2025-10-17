import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface IconDisplayOptions {
  /**
   * Alt text for the icon (for accessibility)
   */
  altText?: string
  /**
   * Icon source path
   */
  iconSrc?: string
  /**
   * Icon size (defaults to 300px)
   */
  size?: number
  /**
   * Whether to show a border around the icon
   */
  showBorder?: boolean
  /**
   * Click handler URL (optional - makes icon clickable)
   */
  clickUrl?: string
}

const defaultOptions: IconDisplayOptions = {
  altText: "Site Icon",
  iconSrc: "/static/dhclogotext.png", // REPLACE THIS WITH YOUR ICON PATH
  size: 300,
  showBorder: false,
  clickUrl: undefined
}

export default ((userOpts?: Partial<IconDisplayOptions>) => {
  const opts: IconDisplayOptions = { ...defaultOptions, ...userOpts }
  
  const IconDisplay: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const iconElement = (
      <img 
        src={opts.iconSrc}                    // PLACEHOLDER - Replace with your icon path
        alt={opts.altText}
        className={classNames("site-icon", { "with-border": opts.showBorder })}
        width={opts.size}
        height={opts.size}
        loading="lazy"                        // Optimize loading performance
      />
    )
    
    return (
      <div className={classNames(displayClass, "icon-display-container")}>
        {opts.clickUrl ? (
          <a 
            href={opts.clickUrl} 
            className="icon-link"
            target="_blank" 
            rel="noopener noreferrer"
          >
            {iconElement}
          </a>
        ) : (
          iconElement
        )}
      </div>
    )
  }
  
  IconDisplay.css = `
    /* Main container for the icon */
    .icon-display-container {
      display: flex;                         /* Flexbox for centering */
      justify-content: flex-start;               /* Center horizontally */
      align-items: flex-start;                   /* Center vertically */
      padding: 0;                         /* Padding around the icon */
      margin-bottom: 0;                   /* Space below the component */
      height: auto;                       /* Auto height based on content */
    }
    .icon-display-container .site-icon {
      width: 40px;                  /* Or your desired size */
      height: 40px;
      margin: 0;                    /* No icon margin */
      display: block;
    }
    
    /* Icon styling */
    .icon-display-container .site-icon {
      width: 300px;                          /* Fixed width - 300px as requested */
      height: 300px;                         /* Fixed height - 300px as requested */
      object-fit: contain;                   /* Maintain aspect ratio, fit within bounds */
      border-radius: 8px;                    /* Slightly rounded corners */
      transition: transform 0.2s ease;       /* Smooth hover animation */
      background-color: var(--light);        /* Background color for transparent images */
    }
    
    /* Optional border styling */
    .icon-display-container .site-icon.with-border {
      border: 2px solid var(--gray);         /* Border color matches theme */
      box-shadow: 0 2px 8px rgba(0,0,0,0.1); /* Subtle shadow */
    }
    
    /* Hover effect for clickable icons */
    .icon-display-container .icon-link .site-icon {
      cursor: pointer;                       /* Show pointer cursor */
    }
    
    .icon-display-container .icon-link:hover .site-icon {
      transform: scale(1.05);                /* Slightly enlarge on hover */
      box-shadow: 0 4px 16px rgba(0,0,0,0.15); /* Enhanced shadow on hover */
    }
    
    /* Responsive design for smaller screens */
    @media (max-width: 1200px) {
      .icon-display-container .site-icon {
        width: 250px;                        /* Smaller on medium screens */
        height: 250px;
      }
    }
    
    @media (max-width: 800px) {
      .icon-display-container .site-icon {
        width: 200px;                        /* Even smaller on mobile */
        height: 200px;
      }
      
      .icon-display-container {
        padding: 0.5rem;                     /* Less padding on mobile */
      }
    }
    
    @media (max-width: 500px) {
      .icon-display-container .site-icon {
        width: 150px;                        /* Smallest size for very small screens */
        height: 150px;
      }
    }
    
    /* Dark mode adjustments */
    @media (prefers-color-scheme: dark) {
      .icon-display-container .site-icon {
        background-color: var(--darkgray);   /* Darker background in dark mode */
      }
      
      .icon-display-container .site-icon.with-border {
        border-color: var(--lightgray);     /* Lighter border in dark mode */
      }
    }
  `
  
  return IconDisplay
}) satisfies QuartzComponentConstructor