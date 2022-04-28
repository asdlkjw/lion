	var _paq = _paq || [];
	_paq.push(['trackPageView']);
	_paq.push(['enableLinkTracking']);
	(function() {
	
	//운영
	var u = 'https://dbp.sktelecom.com';
	//개발
	//var u = 'https://dev.dbp.sktelecom.com';
	_paq.push(['setTrackerUrl', u+'/tracker']);
	_paq.push(['setSiteId', '191']);
	var data = {'platform': '2'};
	_paq.push(['setDBP', data]);
	var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
	g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'/dbp.min.js';
	s.parentNode.insertBefore(g,s);	
	})();