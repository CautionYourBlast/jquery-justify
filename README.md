jquery-justify
==============

A jQuery plugin for justifying images.

## Usage:
Given the following HTML
```
<div id="artwork">
 <div class="dit">
    <a href="/dit/b9ff3b3a-60b1-11e2-b4b1-00ffe0b6e63e?t=c8bb987c-b16a-458c-a99a-341f2a11f10b">
      <img src="https://images.dashdit.com/3cc481cf81b564073782d1fbbbf9227e/4e907ab3a02b4b35/2.jpg?height=220" alt="Alcazar gardens I" />
    </a>
    <div class="detail">
      <span class="title">Alcazar gardens I</span>
      <span class="artist">Jane Human</span>
    </div>
  </div>
  ...
</div>
```

You'd justify like so
```javascript
$('.dit img').justify({
  container: '#artwork',
  marginElement: '.dit'
});
```