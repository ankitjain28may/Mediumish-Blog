(function($) {

  var globalPaginatefeature = false;
  var globalPaginaterecent = false;
  var globalLoaderCheck = false;
  var lastscrollTop = 0;
  var didScroll;

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
    return data;
  }
  // End Extract Info

  // Begin Create Pagination
  function createPaginationRecent(selector) {
    if($(selector).find('ul.js-pager__items')[0] && globalPaginaterecent)
    {
      createPagination(selector);
      globalPaginaterecent = false;
    }
  }

  function createPaginationFeature(selector) {
    if($(selector).find('ul.js-pager__items')[0] && globalPaginatefeature)
    {
      createPagination(selector);
      globalPaginatefeature = false;
    }
  }

  function createPagination(selector) {
    if ($(selector).siblings('.bottompagination')[0]) {
      updatePagination(selector, i);
    } else {
      var pages = $(selector).find('ul.js-pager__items').clone(true);
      var classes = $(selector).find('ul.js-pager__items').attr('class');
      var pagination = '<div class="bottompagination"><span class="navigation"></span></div>';
      $(selector).find('ul.js-pager__items').css('display', 'none');
      $(selector).after(pagination);
      $(selector).siblings('.bottompagination').find('span').append(pages);
    }
  }

  function updatePagination(selector) {
    $(selector).siblings('.bottompagination').find('ul').remove();
    var pages = $(selector).find('ul.js-pager__items').clone(true);
    var classes = $(selector).find('ul.js-pager__items').attr('class');
    var pagination = '<span class="navigation"></span>';
    $(selector).find('ul.js-pager__items').css('display', 'none');
    $(selector).siblings('.bottompagination').find('span').append(pages);
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

  // Hide Preloader Function
  function hideLoader() {
    $(".mediumish-lock-screen").addClass('mediumish-progress-hidden').removeClass('mediumish-progress');
  }

  // Feature Post
  function featurePost() {
    $('.featured .mediumish-block').each(function(i, featuredBlock) {
      $(featuredBlock).find('.views-row').not('.loaded').each(function(j, obj) {
        globalPaginatefeature = true;
        var contentHtml = '<div class="card"><div class="row"><div class="col-md-5 wrapthumbnail"><a href="@link"><div class="thumbnail" style="background-image:url(@image);"></div></a></div><div class="col-md-7"><div class="card-block"><h2 class="card-title"><a href="@link">@title</a></h2><h4 class="card-text">@body</h4><div class="metafooter"><div class="wrapfooter"><span class="meta-footer-thumb"><a href="@authlink"><img class="author-thumb" src="@picture" alt="@author"></a></span><span class="author-meta"><span class="post-name"><a href="@authlink">@author</a></span><br/><span class="post-date">@created</span><span class="dot"></span></div></div></div></div></div></div>';

        var {title, link, author, author_link, body, created, image, picture} = extractInfo(this);

        if (!picture) {
          picture = location.protocol + location.hostname + '/themes/mediumish_blog/img/anonymous.png';
        }

        contentHtml = contentHtml.replace('@title', title).replace('@body', body.substr(1, 200)).replace('@author', author).replace('@author', author).replace('@link', link).replace('@link', link).replace('@authlink', author_link).replace('@authlink', author_link).replace('@image', image).replace('@created', created).replace('@picture', picture);

        $(this).html(contentHtml);
        $(this).addClass('loaded');

      });
      createMore(featuredBlock);
      createPaginationFeature(featuredBlock);
    });
  }

  // Recent Post
  function recentPost() {
    $('.recent-posts .mediumish-block').each(function(i, recentBlock) {
      $(recentBlock).find('.views-row').not('.loaded').each(function(j, obj) {
        globalPaginaterecent = true;
        var contentHtml = '<div class="card"><a href="@link"><img class="img-fluid thumbnail" src="@image" alt=""></a><div class="card-block"><h2 class="card-title"><a href="@link">@title</a></h2><h4 class="card-text">@body</h4><div class="metafooter"><div class="wrapfooter"><span class="meta-footer-thumb"><a href="@authlink"><img class="author-thumb" src="@picture" alt="@author"></a></span><span class="author-meta"><span class="post-name"><a href="@authlink">@author</a></span><br/><span class="post-date">@created</span><span class="dot"></span></span></div></div></div></div>';

        var {title, link, author, author_link, body, created, image, picture} = extractInfo(this);

        if (!picture) {
          picture = location.protocol + location.hostname + '/themes/mediumish_blog/img/anonymous.png';
        }

        contentHtml = contentHtml.replace('@title', title).replace('@body', body.substr(1, 200)).replace('@author', author).replace('@author', author).replace('@link', link).replace('@link', link).replace('@authlink', author_link).replace('@authlink', author_link).replace('@image', image).replace('@created', created).replace('@picture', picture);
        $(this).html(contentHtml);
        $(this).addClass('loaded');

      });
      createMore(recentBlock);
      createPaginationRecent(recentBlock);
    });
  }

  // Page Title
  var pro1 = new Promise(function (resolve, reject) {
    $('.mediumish-main-content div#block-mediumish-blog-page-title').ready(function() {
      var selector = $('.mediumish-main-content div#block-mediumish-blog-page-title h1');
      selector.addClass('section-title');
      selector.html('<h2><span>' + selector.text() + '</span></h2>');
      resolve();
    });
  });


  // Featured Region
  var pro2 = new Promise(function (resolve, reject) {
    $(".featured .mediumish-block > div > div").ready(function() {
      $('.featured .mediumish-block').addClass('card-columns listfeaturedtag');
      featurePost();
      resolve();
    });
  });
  // End Featured Region

  // Begin Recent-Posts Region
  var pro3 = new Promise(function (resolve, reject) {
    $(".recent-posts .mediumish-block > div > div").ready(function() {
      $('.recent-posts .mediumish-block').addClass('card-columns listrecent');
      recentPost();
      resolve();
    });
  });

  Promise.all([pro1, pro2, pro3]).then(function() {
    hideLoader();
  }).catch(function(err) {
    console.log(err);
  });

  // Set Interval for Recent posts in case of using AJAX in paging
  $(".recent-posts .mediumish-block > div > div").ready(function() {
    $('.recent-posts .mediumish-block').addClass('card-columns listrecent');
    setInterval(function() {
      recentPost();
    }, 250);
  });

  // Set Interval for Featured posts in case of using AJAX in paging
  $(".featured .mediumish-block > div > div").ready(function() {
    $('.featured .mediumish-block').addClass('card-columns listfeaturedtag');
    setInterval(function() {
      featurePost();
    }, 250);
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

  // show share option at the bottom on scrolling upper.
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

  // For Author image
  $(".mediumish-author").ready(function () {
    setInterval(function() {
      $(".mediumish-author img").addClass('author-thumb');
      $(".mediumish-author-thumb img").addClass('author-thumb');
    }, 250);
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

