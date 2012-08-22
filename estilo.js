function gerar_janela(url){
	$.get(url, function(data){
		$('.load_content2').html(data);
	});
	var maskHeight = $(document).height();
	var maskWidth = $(window).width();
	var winH = $(window).height();
	var winW = $(window).width();
	$('#mask').css({'width':maskWidth,'height':maskHeight});
	$('#mask').fadeIn('fast');
	$('#mask').fadeTo("fast",0.9);
	$('#dialog').css('top',  winH/2-$('#dialog').height()/2);
	$('#dialog').css('left', winW/2-$('#dialog').width()/2);
	$('#dialog').fadeIn(500);
	$('.window .close').css({opacity:'0.5'},200).hover(function(){
		$(this).animate({opacity: '1.0'},200);
	},function(){
	 	$(this).animate({opacity: '0.5'},200);
	});
	$('.window .close').click(function (e) {
		e.preventDefault();
		$('#mask, .window').hide();
	});
	$('#mask').click(function () {
		$(this).hide();
		$('.window').hide();
		$('.window .load_content2').html("");
	});
}
	function showTopButton(){
		if($.browser.webkit){
			$('a#top').css("display", "block");
		}else{
			$('a#top').fadeIn('slow');
		}
	}
	function hideTopButton(){
		if($.browser.webkit){
			$('a#top').css("display", "none");
		}else{
			$('a#top').fadeOut('slow');
		}
	}
	function calculatePosition(){
		var position;
		var arrayPosition = [];	
		var j = 0;
		// cria o array com as posições de cada um
		$('.content').each(function(i){
			position = $(this).position();
			arrayPosition.push(position.top)
			j = i+1;
			$('#openPanel'+j).attr('positiontop',arrayPosition[i]);
			$('#panel'+j).attr('positiontop',arrayPosition[i]);
		});
	}
	function calculateSizes(){
		 if($(window).width() <= 760){
		 	$('#googleMapsIframe').attr('width', 300);
		 }else{
		 	$('#googleMapsIframe').attr('width', 425);
		 }
	}

function execmascara(){v_obj.value=v_fun(v_obj.value);}
function mascara(o,f){v_obj=o;v_fun=f;setTimeout("execmascara()",1);}
function cep(v){v=v.replace(/D/g,"");v=v.replace(/^(\d{5})(\d)/,"$1-$2");return v}
function telefone(v){v=v.replace(/\D/g,"");v=v.replace(/^(\d\d)(\d)/g,"($1) $2");v=v.replace(/(\d{4})(\d)/,"$1-$2");return v;}
function so_num(v){return v.replace(/\D/g,"");}

$(document).ready(function(){
	calculateSizes();
	calculatePosition();
	// calcula o posicionamento e cria o evento de ir até o link

	$(window).on('resize', function(){
		calculatePosition();
		calculateSizes();
	});

	// make the magic to find
	var href = "";
	var id = "";
	$(document).on('click','nav ul li a', function(e){
		e.preventDefault();
		id = $(this).attr('href').split('#')[1];
		$('html, body').animate({'scrollTop':$('#'+id).offset().top},500);
	});

	//events on mobile
	$(document).on('click', '#listaProfessores ul.listaProfMobile li a', function(e){
		e.preventDefault();
		href = $(this).attr('href').split('#prof=')[1];
		$.get('textos.php',{prof:href}, function(data){
			$('#showText').html('<hr />'+data);
			$('html, body').animate({'scrollTop':$('#showText').offset().top},500);
			calculatePosition()
		});
	});

	var href = "";
	$(document).on('keypress', '#telefone', function(){$(this).attr("maxlength", 14);mascara(this, telefone);});
	$(document).on('keypress', '#captcha', function(){$(this).attr("maxlength", 6);mascara(this, so_num);});

	$(document).on('click', '#listaProfessores ul.listaProfBig li a', function(e){
		e.preventDefault();
		href = $(this).attr('href').split('#prof=')[1];
		gerar_janela("professores.php?prof="+href);
	});


	
	
	

	$(document).on('click', 'a#top', function(e){
		e.preventDefault();
		$('html, body').animate({'scrollTop':0},500);
	});

	var htmlPosition = "";


	$(window).scroll(function(){
		if($.browser.webkit){
			htmlPosition = $('body').scrollTop();
		}else{
			htmlPosition = $('html').scrollTop();
		}
		if(htmlPosition > 100){
			showTopButton();
		}else{
			hideTopButton();
		}
	});


	var hrefData = "";
	$(document).on('click','#datas a', function(e){
		e.preventDefault();
		if($(this).hasClass('inactive')){
			$('#datas a').not(this).removeClass('active').addClass('inactive');
			$(this).removeClass('inactive');
		}
		hrefData = $(this).attr('href').split('#dia=')[1];
		$('.dia23, .dia24').css('display','none');
		$('.dia'+hrefData).css('display','block');
	});

$(function() {
		var step = 1; 
		var current = 0; 
		var maximum = $('#listaProfessores ul.listaProfBig li').size(); 
		var visible = 4; 
		var speed = 200; 
		var liSize = 200;
		var carousel_height = 161;
		var returns = 0;
		var totalSize = $('#listaProfessores ul.listaProfBig').width();
		var sizeContent = $('#listaProfessores').width();
		var totalSizeContent = Number(totalSize)-Number(sizeContent);
		//alert(totalSizeContent)
		var ulSize = liSize * maximum;   
		var divSize = liSize * visible;
		$('#listaProfessores ul.listaProfBig').css("width", liSize*maximum);


		function nextStep(){
			if(current + step < 0 || current + step > maximum - visible) {
				$('#listaProfessores ul.listaProfBig').animate({left: 0});
				current = 0;
				return false; 
			}else {
				current = current + step;
				$('#listaProfessores ul.listaProfBig').animate({left: -(liSize * current)}, speed, null);
			}
			return false;
		}
		function tryAgain(){
			time = window.setInterval(function(){
				nextStep();
			},5000);
		}
		function prevStep(){
			if(current - step < 0 || current - step > maximum - visible) {
				$('#listaProfessores ul.listaProfBig').animate({left: -(totalSizeContent)});
				current = maximum-visible;
				return false; 
			}else {
				current = current - step;
				$('#listaProfessores ul.listaProfBig').animate({left: -(liSize * current)}, speed, null);
			}
			return false;
		}
		$(document).on('click', 'a#nextProf', function(e){
			e.preventDefault();
			nextStep();
			time=window.clearInterval(time);
			tryAgain();
		});
 		
		$(document).on('click', 'a#prevProf', function(e){
			e.preventDefault();
			prevStep();
			time=window.clearInterval(time);
			tryAgain();
		});
		tryAgain(); 
	});











	var printss = "";
	$(document).on('click', '#videos', function(e){
		e.preventDefault();
		if($(this).hasClass('inactive')){
			$('.pretty').not(this).removeClass('active').addClass('inactive');
			$(this).removeClass('inactive');
		}
		$('#contentInsideText').css('display', 'none');
		$('#contentInsideVideo').css('display','block');
	});

	$(document).on('click', '#textos', function(e){
		e.preventDefault();
		if($(this).hasClass('inactive')){
			$('.pretty').not(this).removeClass('active').addClass('inactive');
			$(this).removeClass('inactive');
		}
		$('#contentInsideText').css('display', 'block');
		$('#contentInsideVideo').css('display','none');
	});

	var serie;
$(document).on('click', '#submitForm', function(e){
      e.preventDefault();
      var erro = $('input[type=text], textarea').length;
      var erroEmail = $('#email').length;
      var emailRE = new RegExp("^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$");
    $('input[type=text], textarea').each(function(){
      	if($(this).val().length < 1){
      		$(this).css('border', '1px solid red')
      	}else{
      		$(this).css('border', '1px solid green')
      		erro--;
      	}
    });

    if(emailRE.test($('#email').val())){
    	$('#email').css('border', '1px solid green')
    	erroEmail--
    }else{
    	$('#email').css('border', '1px solid purple')
    }
	if(erro >= 1 || erroEmail == 1){
      		$('p#showErrors').html('Favor preencher os dados corretamente.').css('display','block')
    }else{
      		$('p#showErrors').html("").css('display','none');
      		serie = $('input, textarea').serialize();
      		$.post('sendEmail.php',serie, function(data){
      			$('p#showErrors').html(data).css('display','block');
      		})
    }
  });

var videoid = "";
	$(document).on('click','#contentInsideVideo ul li a', function(e){
		e.preventDefault();
		videoid = $(this).attr('href').split('#videoid=')[1];
		$('#youtubeVideo').html("<iframe width=\"600\" height=\"380\" src=\"http://www.youtube.com/embed/"+videoid+"?fs=1&autoplay=1\" frameborder=\"0\" allowfullscreen=\"true\"></iframe>");

	})

});