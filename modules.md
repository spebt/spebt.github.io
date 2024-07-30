---
title: Modules
layout: default
permalink: /modules/
---
- The modules' codes are hosted on GitHub. 
- You can click the links bellow to check them out on the GitHub.
- You can also take a look at the simple documentation of each module.

# Modules:

{% for module in site.data.modules %}
- ## {{module.name}}
  - [GitHub Repository](https://github.com/spebt/{{module.name}})
  - [Documentation](https://spebt.github.io/{{module.name}})
{% endfor %}

<!-- <table id="module-list">
  <tr>
    <th>Module Name</th>
    <th></th>
    <th></th>
  </tr>
{% for module in site.data.modules %}
<tr>
<td><h2>{{module.name }}</h2></td>
<td><a href="https://github.com/spebt/{{module.name}}">GitHub Repo</a></td>
<td><a href="https://spebt.github.io/{{module.name}}">Documentation</a></td>
</tr>
{% endfor %}
</table> -->