(function($) {
  var globalPaginatefeature = false;
  var globalPaginaterecent = false;

  // Extract Info
  function extractInfo(selector) {
    var data = {
      title: $(selector).find('.views-field-title').text(),
      link: $(selector).find('.views-field-title > span > a').attr('href'),
      author: $(selector).find('.views-field-uid').text(),
      author_link: $(selector).find('.views-field-uid span a').attr('href'),
      body: $(selector).find('.views-field-body').text(),
      created: $(selector).find('.views-field-created').text(),
      image: $(selector).find('.views-field-field-image img').attr('src'),
      picture: $(selector).find('.views-field-user-picture img').attr('src'),
    }
    console.log(data);
    return data;
  }
  // End Extract Info

  // Begin Create Pagination
  function createPaginationRecent(selector, i) {
    if($(selector).find('ul.js-pager__items')[0] && globalPaginaterecent)
    {
      createPagination(selector, i);
      globalPaginaterecent = false;
    }
  }

  function createPaginationFeature(selector, i) {
    if($(selector).find('ul.js-pager__items')[0] && globalPaginatefeature)
    {
      createPagination(selector, i);
      globalPaginatefeature = false;
    }
  }

  function createPagination(selector, i) {
    if ($(selector).siblings('.bottompagination')[0]) {
      updatePagination(selector, i);
    } else {
      var pages = $(selector).find('ul.js-pager__items').html();
      var classes = $(selector).find('ul.js-pager__items').attr('class');
      var pagination = '<div class="bottompagination"><span class="navigation"><ul class="' + classes + '" data-mediumish-pager="pager-' + i +'">';
      pagination = pagination + pages + '</ul></span></div>';
      $(selector).find('ul.js-pager__items').attr('data-mediumish-parent-pager', 'pager-' + i).css('display', 'none');
      $(selector).after(pagination);
    }
  }

  function updatePagination(selector, i) {
    $(selector).siblings('.bottompagination').find('li').remove();
    var pages = $(selector).find('ul.js-pager__items').html();
    var classes = $(selector).find('ul.js-pager__items').attr('class');
    var pagination = '<span class="navigation"><ul class="' + classes + '" data-mediumish-pager="pager-' + i +'">';
    pagination = pagination + pages + '</ul></span>';
    $(selector).find('ul.js-pager__items').attr('data-mediumish-parent-pager', 'pager-' + i).css('display', 'none');
    $(selector).siblings('.bottompagination').html(pagination);
  }

  // End Create Pagination

  // Begin Create More
  function createMore(selector) {
    if ($(selector).find('div div .more-link')[0]) {
      var ele =  $(selector).find('div div .more-link');
      var more = ele.text();
      var link = ele.find('a').attr('href');
      $(selector).siblings('.section-title').find('h2 a').text(more).attr('href', link).removeClass('display-none');
      ele.css('display', 'none');
    }
  }
  // End Create More

  // Featured Region
  $(".featured .mediumish-block > div > div").ready(function() {
    $('.featured .mediumish-block').addClass('card-columns listfeaturedtag');
    setInterval(function() {
      $('.featured .mediumish-block').each(function(i, featuredBlock) {
        $(featuredBlock).find('.views-row').not('.loaded').each(function(j, obj) {
          globalPaginatefeature = true;
          var contentHtml = '<div class="card"><div class="row"><div class="col-md-5 wrapthumbnail"><a href="@link"><div class="thumbnail" style="background-image:url(@image);"></div></a></div><div class="col-md-7"><div class="card-block"><h2 class="card-title"><a href="@link">@title</a></h2><h4 class="card-text">@body</h4><div class="metafooter"><div class="wrapfooter"><span class="meta-footer-thumb"><a href="@authlink"><img class="author-thumb" src="@picture" alt="@author"></a></span><span class="author-meta"><span class="post-name"><a href="@authlink">@author</a></span><br/><span class="post-date">@created</span><span class="dot"></span></div></div></div></div></div></div>';

          var {title, link, author, author_link, body, created, image, picture} = extractInfo(this);

          contentHtml = contentHtml.replace('@title', title).replace('@body', body.substr(1, 200)).replace('@author', author).replace('@author', author).replace('@link', link).replace('@link', link).replace('@authlink', author_link).replace('@authlink', author_link).replace('@image', image).replace('@created', created).replace('@picture', picture);

          $(this).html(contentHtml);
          $(this).addClass('loaded');

        });
      createMore(featuredBlock);
      createPaginationFeature(featuredBlock, i);
      });
    }, 250);
  });
  // End Featured Region

  // Begin Recent-Posts Region
  $(".recent-posts .mediumish-block > div > div").ready(function() {
    $('.recent-posts .mediumish-block').addClass('card-columns listrecent');
    setInterval(function() {
      $('.recent-posts .mediumish-block').each(function(i, recentBlock) {
        $(recentBlock).find('.views-row').not('.loaded').each(function(j, obj) {
          globalPaginaterecent = true;
          var contentHtml = '<div class="card"><a href="@link"><img class="img-fluid thumbnail" src="@image" alt=""></a><div class="card-block"><h2 class="card-title"><a href="@link">@title</a></h2><h4 class="card-text">@body</h4><div class="metafooter"><div class="wrapfooter"><span class="meta-footer-thumb"><a href="@authlink"><img class="author-thumb" src="@picture" alt="@author"></a></span><span class="author-meta"><span class="post-name"><a href="@authlink">@author</a></span><br/><span class="post-date">@created</span><span class="dot"></span></span></div></div></div></div>';

          var {title, link, author, author_link, body, created, image, picture} = extractInfo(this);

          contentHtml = contentHtml.replace('@title', title).replace('@body', body.substr(1, 200)).replace('@author', author).replace('@author', author).replace('@link', link).replace('@link', link).replace('@authlink', author_link).replace('@authlink', author_link).replace('@image', image).replace('@created', created).replace('@picture', picture);
          $(this).html(contentHtml);
          $(this).addClass('loaded');

        });
      createMore(recentBlock);
      createPaginationRecent(recentBlock, i);
      });

    }, 250);
  });



  /*$(".content-block-mediumish-title h1").ready(function() {
      var page_title = $(".content-block-mediumish-title h1").text();
      var page_title_classes = $(".content-block-mediumish-title h1").attr('class');
      $(".content-block-mediumish-title h1").replaceWith('<div class="section-title"><h2 class="' + page_title_classes + '"><span>' + page_title +'</span></h2></div>')
  });

  $(".content-block-mediumish > div > div").ready(function() {
      $('.content-block-mediumish div .views-row').each(function(i, obj) {
          var contentHtml = '<div class="card"><a href="@link"><img class="img-fluid" src="@image" alt=""></a><div class="card-block"><h2 class="card-title"><a href="@link">@title</a></h2><h4 class="card-text">@body</h4><div class="metafooter"><div class="wrapfooter"><span class="author-meta"><span class="post-name"><a href="@authlink">@author</a></span><br/><span class="post-date">@created</span><span class="dot"></span><span class="post-read">6 min read</span></span></div></div></div></div>';

          var data = {}
          data.title = $(this).children('article').children('h2').children('a').children('span').text();
          data.link = $(this).children('article').children('h2').children('a').attr('href');
          data.author = $(this).children('article').children('footer').children('div').children('span:first').text();
          data.author_link = $(this).children('article').children('footer').children('div').children('span').first().children('a').attr('href');
          data.body = $(this).children('article').children('div').children('div').text();
          data.created = $(this).children('article').children('footer').children('div').children('span:nth-child(2)').text();
          data.image = $(this).children('article').children('div').children('div').children('div').children('img').attr('src');

          contentHtml = contentHtml.replace('@title', data.title).replace('@body', data.body.substr(1, 200)).replace('@author', data.author).replace('@link', data.link).replace('@link', data.link).replace('@authlink', data.author_link).replace('@image', data.image).replace('@created', data.created);
          $(this).html(contentHtml);
          // console.log(data);
      });

  });*/

  $('.recent-posts div.js-quickedit-page-title').ready(function() {
      var selector = $('.recent-posts .js-quickedit-page-title');
      selector.addClass('section-title');
      selector.html('<h2><span>' + selector.text() + '</span></h2>');
  });
  $('.mediumish-blog-image img').ready(function() {
      $('.mediumish-blog-image img').addClass('featured-image img-fluid');
  });

  $('.mediumish-blog-body div').ready(function() {
      $('.mediumish-blog-body div').addClass('article-post');
  });

  $('.mediumish-blog-tags div').ready(function() {
      var selector = $('.mediumish-blog-tags div');
      var tags = '<ul class="tags">';
      $('.mediumish-blog-tags > div > div').each(function(i, obj) {
          var text = $(this).text();
          var link = $(this).children('a').attr('href');
          tags += '<li><a href="' + link + '">' + text + '</a></li>';
      });
      $('.mediumish-blog-tags > div').addClass('after-post-tags');
      tags += '</ul>'
      $('.mediumish-blog-tags > div').html(tags);

  });

  $('.mediumish-blog-category div').ready(function() {
      $('.mediumish-blog-category > div > div').first().addClass('posttitle');
  });

  $('.mediumish-blog-comment section').ready(function() {
      $('.mediumish-blog-comment > section > h2').first().addClass('posttitle');
  });

  var lastscrollTop = 0;
  var didScroll;
  $(window).scroll(function(){
      didScroll = true;
  });

  setInterval(function() {
    if (didScroll && $(window).width() <= 1023) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
      var threshold = 5;
      if( $(window).scrollTop() - threshold >= lastscrollTop ){
          $('.alertbar-share').slideUp("fast");
      } else {
          $('.alertbar-share').slideDown('fast');
      }
      lastscrollTop = $(window).scrollTop();
  }

  $(document).on('click', 'div.bottompagination a', function (e) {
    e.preventDefault();
    var ele = $(this).parent('li').parent('ul').attr('data-mediumish-pager');
    console.log(ele);
    var href = $(this).attr('href');
    var rel = $(this).attr('rel');
    var search = 'a';
    $.each(this.attributes, function() {
      search += '[' + this.name + '="' + this.value + '"]';
    });

    console.log($("ul[data-mediumish-parent-pager='" + ele +"']").find(search));

    $("ul[data-mediumish-parent-pager='" + ele +"']").find(search).click();
  })

  $('.mediumish-blog-author').ready(function() {
    var content = '<div class="row post-top-meta"><div class="col-md-2 col-sm-2 mediumish-author"><a href="@authlink"><img class="author-thumb" src="@picture" alt="@author"></a></div><div class="col-md-10 col-sm-10 mediumish-author-details"><a class="link-dark author-style" href="@authlink">@author</a><span class="author-description mediumish-description">@description</span><span class="post-date">@date</span><span class="dot"></span></div></div>';
    var data = {
      author: $('.mediumish-blog-author').text(),
      date: $('.mediumish-blog-date').text(),
      authlink: $('.mediumish-blog-author a').attr('href'),
      picture: $('.mediumish-blog-author img').attr('src'),
      description: "Web Developer and open source enthisiast",
    }
    content = content.replace('@author', data.author).replace('@author', data.author).replace('@authlink', data.authlink).replace('@authlink', data.authlink).replace('@date', data.date).replace('@picture', data.picture).replace('@description', data.description);

    $('.mainheading').prepend(content);

  });

  $(".share span").ready(function () {
    $(".share span").each(function(i, obj) {
      console.log($(obj).attr('displaytext'));
    });
  });

  $('.mediumish-tabs a').ready(function() {
    $(".mediumish-tabs a").addClass('nav-link');
    $(".mediumish-tabs a.is-active").addClass('active');
  });

  $(".share a, .alertbar-share a").ready(function() {
    $(".share a, .alertbar-share a").each(function(i, obj) {
      var link = $(obj).attr('href');
      link += location.href;
      $(obj).attr('href', link);
    });
  });

})(jQuery);

