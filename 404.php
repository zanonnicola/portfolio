<?php 
/*
Template Name: 404 Page
*/
?>

<?php get_header(); ?>

<?php get_template_part("templates/nav"); ?>

<main role="main" class="news">
	<div class="wrapper">

		<div class="box">
			<h1>404 - Page Not Found</h1>
			<p>Oh dear, we seem to have lost your page. Sorry about that.</p>
			<a href="<?php echo esc_url( home_url() ); ?>" class="cta-blank">RETURN TO THE MAIN WEBSITE</a>
		</div>

	</div>

</main>

<?php get_footer(); ?>
