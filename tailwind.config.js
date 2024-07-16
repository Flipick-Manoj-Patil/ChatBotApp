/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': 'var(--font-family-primary)',
        'secondary': 'var(--font-family-secondary)',
      },
      colors: {
        'flp_accent': 'var(--theme-color)',
        'flp_second_accent': 'var(--theme-secondary-clr)',
        'flp_text': 'var(--text-color)',
        'flp_second_text': 'var(--text-secondary-color)',
        'flp_title_text': 'var(--text-title)',
        'flp_form_text': 'var(--text-form)',        
        'flp_background': 'var(--body-bg-color)',
        'flp_header_bg': 'var(--top-banner)',  
        'flp_footer-text': 'var(--footer-text-clr)',  
        'flp_tableHeader_bg': 'var(--table-th-clr)',       
        'flp_button': 'var(--btn-primary-bg)',
        'flp_button-hover': 'var(--btn-primary-hover-color)',
        'flp_tab_bg': 'var(--tab-bg-clr)',
        'flp_tab_selected_bg': 'var(--tab-selected-bg-clr)',
        'flp_tab_text': 'var(--tab-text-clr)',
        'flp_tab_selected_text': 'var(--tab-selected-text-clr)',
        'flp_sidebar-bg': 'var(--sidebar-bg-clr)',
        'flp_sidebar-text': 'var(--sidebar-text-clr)',
        'flp_sidebar-selected': 'var(--sidebar-selected-bg)',
      },           
      height: {
        'header-height': 'var(--header-height)',
        'footer-height': 'var(--footer-height)',
        'content-height': 'calc(calc(100 * var(--vh)) - var(--header-height))'
      }, 
      minHeight: {
        'min_body_h': 'calc(calc(100 * var(--vh)) - var(--header-height))',
      },
      boxShadow: {
        'active-shadow': '0 3px 6px 0 rgba(0,0,0,0.29);',
        'button-shadow': '0 3px 6px 0 rgba(0,0,0,0.29);',
        'card-shadow': '0 3px 6px 0 rgba(0,0,0,0.29);',
        'sidebar-shadow': '4px 0 4px -2px rgba(0,0,0,0.29);',
        'hover-card-shadow': '0 3px 10px 3px rgba(0,0,0,0.29);',
        'focus':'0 0 0 0.25rem rgb(41 83 179 / 25%)'
      }
    },
  },
  plugins: [],
}

