chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {

        if (request.action == 'PageInfo') {
            var pageInfos = [];
            $('.js-item-hotel').each(function () {
                var pageInfo = {};

                pageInfo.image = $(this).children('.item__image-area')
                    .children('.item__image-wrapper')
                    .children('img').attr('src');

                pageInfo.title = $(this).children('.item__flex-column')
                    .children('.item__details')
                    .children('h3').attr('title');

                pageInfo.stars = $(this).children('.item__flex-column')
                    .children('.item__details')
                    .children('h3').attr('data-category');

                pageInfo.location = $(this).children('.item__flex-column')
                    .children('.item__details')
                    .children('.item__location')
                    .find('p').text();

                pageInfo.review = $(this).children('.item__flex-column')
                    .children('.item__details')
                    .children('.item__review')
                    .find('p').text();

                pageInfo.flag_rated = $(this).children('.item__flex-column')
                    .children('.item__details')
                    .children('.item__dynamic-content')
                    .find('.item__flags').find('.flag--new').text();

                pageInfo.flag_new = $(this).children('.item__flex-column')
                    .children('.item__details')
                    .children('.item__dynamic-content')
                    .find('.item__flags').find('.flag--rated').text();

                var affiliates = [];
                $(this).children('.item__flex-column').children('.item__deal-other').children('ul').children('li').each(
                        function () {
                            var affiliate = {};
                             affiliate.link = $(this).data('link');
                             affiliate.text = $(this).text();
                            affiliates.push(affiliate);
                         });

                pageInfo.affiliates = affiliates;

                var bestDeal = {};
                var bestDealParentElement = $(this).children('.item__flex-column').children('.item__deal-best').children('.item__deal-best-link');
                bestDeal.link = bestDealParentElement.data('link');
                bestDeal.flag_deal = bestDealParentElement.children('.item__flag').text();
                bestDeal.title =  bestDealParentElement.children('.item__best-details ').find('.item__deal-best-ota').text();

                bestDeal.item_price_striked = bestDealParentElement.children('.item__best-details ').find('s').text();

                bestDeal.item_best_price = bestDealParentElement.children('.item__best-details ').find('.item__best-price').text();

                pageInfo.bestDeal = bestDeal;

                pageInfos.push(pageInfo);
            });
            
            sendResponse(pageInfos);
        }
    });