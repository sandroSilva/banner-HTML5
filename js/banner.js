// JavaScript Document
var numbanner;
var vfirt;
var newImage;
var timerInit;
var vUltimo;
var lTempBanner = 1;
var noticiaLimiter = 400;

$(document).ready(function() 
	{
		$.getJSON("json/banner.json", function(data)
			{
				$.each(data.BANNER, function(i, item)
					{
							
						if(vfirt == null)
							{
								$("#bannerimg").append('<div class="opaque zbanner" id="banner'+ (i+1) +'"><a href="'+ item.url +'#!'+ item._hash +'" target="_parent"> <img src="images/bannner/'+ item._img +'" /> </a></div>');
								$("#banner_controls").append('<div class="selbanner selectbanner" id="control'+ (i) +'">'+ (i+1) +'</div>');
								vfirt = "s";
							}
						else
							{
								$("#bannerimg").append('<div id="banner'+ (i+1) +'"><a href="'+ item.url +'#!'+ item._hash +'" target="_parent"> <img src="images/bannner/'+ item._img +'" /> </a></div>');
								$("#banner_controls").append('<div class="selbanner" id="control'+ (i) +'">'+ (i+1) +'</div>');
							}

						numbanner = i+1;
					});
				timerInit=setInterval(function(){bannerTimer()},5000);
			});

		function bannerTimer()
			{
				vUltimo = $('#bannerimg div:last-child').attr('id');

				if(vUltimo == ("banner"+lTempBanner))
					{
						$('#bannerimg div:nth-child('+ lTempBanner +')').removeClass("opaque");
						$('#bannerimg div:nth-child('+ lTempBanner +')').removeClass("zbanner");
			   			newImage = $(this).index();
			   			$('#banner_controls div:nth-child('+ lTempBanner +')').removeClass("selectbanner");
			   			lTempBanner = 1;
			   		 	$('#bannerimg div:nth-child('+ lTempBanner +')').eq(newImage).addClass("opaque");
			   		 	$('#bannerimg div:nth-child('+ lTempBanner +')').eq(newImage).addClass("zbanner");
			   		 	$('#banner_controls div:nth-child('+ lTempBanner +')').addClass("selectbanner");
					}
				else
					{
						$('#bannerimg div:nth-child('+ lTempBanner +')').removeClass("opaque");
						$('#bannerimg div:nth-child('+ lTempBanner +')').removeClass("zbanner");
						$('#banner_controls div:nth-child('+ lTempBanner +')').removeClass("selectbanner");
			   			newImage = $(this).index();
			   			lTempBanner = lTempBanner + 1;
			   		 	$('#bannerimg div:nth-child('+ lTempBanner +')').eq(newImage).addClass("opaque");
			   		 	$('#bannerimg div:nth-child('+ lTempBanner +')').eq(newImage).addClass("zbanner");
			   		 	$('#banner_controls div:nth-child('+ lTempBanner +')').addClass("selectbanner");
					}
			}

		 $("#banner_controls").on('click', 'div', function() 
			{
				clearInterval(timerInit);
				var varSel = $(this).attr('id');

				$('#bannerimg div:nth-child('+ lTempBanner +')').removeClass("opaque");
				$('#bannerimg div:nth-child('+ lTempBanner +')').removeClass("zbanner");
				$('#banner_controls div:nth-child('+ lTempBanner +')').removeClass("selectbanner");
			   	newImage = $(this).index();					
				lTempBanner = parseInt(varSel.substr(7,8))+1;
				console.log(lTempBanner);
					
			   	$('#bannerimg div:nth-child('+ lTempBanner +')').addClass("opaque");
			   	$('#bannerimg div:nth-child('+ lTempBanner +')').addClass("zbanner");
			   	$('#banner_controls div:nth-child('+ lTempBanner +')').addClass("selectbanner");

				timerInit=setInterval(function(){bannerTimer()},5000);
			});

	});