# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information

project = "SPEBT"
copyright = "2024, Fang Han"
author = "Fang Han"
release = "version 2024.09.18"

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ["myst_parser","sphinx_design"]
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

templates_path = ["_templates"]
exclude_patterns = []
html_last_updated_fmt = "%b %d, %Y"


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = "pydata_sphinx_theme"
html_static_path = ["_static"]
html_theme_options = {
    "secondary_sidebar_items": [
        "page-toc",
        "edit-this-page",
    ],
    "navbar_start": ["navbar-logo", "version"],
    "content_footer_items": ["last-updated"],
    "navbar_start": ["navbar-logo"],
    "navbar_center": ["navbar-icon-links","navbar-nav"],
    "navbar_end": ["theme-switcher"],
    "navbar_persistent": ["search-button"],
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
}
html_logo = "_static/logo.png"
html_favicon = "_static/favicon.ico"
html_title = "SPEBT"
