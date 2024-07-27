---
title: Modules
layout: splash
---

# Modules:
<table id="module-list">
  <tr>
    <th>Module Name</th>
    <th></th>
    <th></th>
  </tr>
{% for module in site.data.modules %}
<tr>
<td><b>{{module.name }}</b></td>
<td><a href="https://github.com/spebt/{{module.name}}">GitHub Repo</a></td>
<td><a href="https://spebt.github.io/{{module.name}}">Documentation</a></td>
</tr>
{% endfor %}
</table>