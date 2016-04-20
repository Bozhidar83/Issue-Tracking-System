(function() {
    "use strict";

    angular.module('issueTrackingSystemApp')
        .directive('backToTop', [
            function() {
                return {
                    restrict: 'A',
                    scope: true,
                    template: '<a href="#" class="back-to-top">Back to Top</a>',
                    link: function(scope, el, attr) {
                        angular.element(document).ready(function () {
                            var offset = 220;
                            var duration = 500;
                            jQuery(window).scroll(function() {
                                if (jQuery(this).scrollTop() > offset) {
                                    jQuery('.back-to-top').fadeIn(duration);
                                } else {
                                    jQuery('.back-to-top').fadeOut(duration);
                                }
                            });

                            jQuery('.back-to-top').click(function(event) {
                                event.preventDefault();
                                jQuery('html, body').animate({scrollTop: 0}, duration);
                                return false;
                            })
                        });
                    }
                }
            }
        ])
})();