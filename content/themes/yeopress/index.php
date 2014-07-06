<?php get_header() ?>
<div id="page-content">
<div class="thumbContainer">
    <img class="thumb" src="/content/uploads/thumb.gif" width="200" height="200">
</div>
<ul class="rollover">
    <li class="first">First</li>
    <li class="second">Second</li>
    <li class="third">Third</li>
</ul>

	<?php get_template_part('loop', 'index') ?>
</div>
<?php get_sidebar() ?>
<?php get_footer() ?>
