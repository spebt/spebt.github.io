# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "SPEBT Project Documentation"
copyright = "2024, SPEBT"
author = "Fang Han"
release = "version 0.1.0"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ["myst_parser", "sphinx_design"]
myst_enable_extensions = [
    "amsmath",
    "attrs_inline",
    "colon_fence",
    "deflist",
    "dollarmath",
    "fieldlist",
    "html_admonition",
    "html_image",
    # "linkify",
    "replacements",
    "smartquotes",
    "strikethrough",
    "substitution",
    "tasklist",
]
myst_words_per_minute = 200

templates_path = ["_templates"]
exclude_patterns = []
html_last_updated_fmt = "%b %d, %Y"


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "pydata_sphinx_theme"
html_static_path = ["_static"]
html_theme_options = {
    "show_prev_next": False,
    "secondary_sidebar_items": [
        "page-toc",
        "edit-this-page",
    ],
    "navbar_start": ["navbar-logo"],
    "navbar_center": [ "navbar-nav"],
    "navbar_end": ["navbar-icon-links", "theme-switcher"],
    "navbar_persistent": ["search-button"],
    "navbar_align": "right",
    "content_footer_items": [],
    "footer_start": ["version","last-updated"],
    "footer_center": ["copyright"],
    "footer_end": ["sphinx-version","theme-version"],
    "back_to_top_button": True,
    "icon_links": [
        {
            # Label for this link
            "name": "SPEBT GitHub",
            # URL where the link will redirect
            "url": "https://github.com/spebt/",  # required
            # Icon class (if "type": "fontawesome"), or path to local image (if "type": "local")
            "icon": "fa-brands fa-square-github",
            # The type of image to be used (see below for details)
            "type": "fontawesome",
        }
    ],
    "logo": {
        "image_light": "_static/img/logo-light.png",
        "image_dark": "_static/img/logo-dark.png",
        "text": "Project Documentation",
        "alt_text": "SPEBT Project Documentation - Home",
    },
}
html_sidebars = {
    "modules": [],
    "about": [],
    "quickstart": [],
}

html_favicon = "_static/favicon.ico"
html_title = "SPEBT"
