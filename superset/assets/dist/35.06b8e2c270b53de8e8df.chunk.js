(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{2188:function(t,e,r){function n(t){for(var r=Object.keys(t),n=0,a=r.length;n<a;n++)e[r[n]]=t[r[n]]}n(r(2414)),n(r(2415)),n(r(2231)),n(r(2232))},2231:function(t,e){var r=.5772156649015329,n=[-1.716185138865495,24.76565080557592,-379.80425647094563,629.3311553128184,866.9662027904133,-31451.272968848367,-36144.413418691176,66456.14382024054],a=[-30.840230011973897,315.35062697960416,-1015.1563674902192,-3107.771671572311,22538.11842098015,4755.846277527881,-134659.9598649693,-115132.25967555349];function i(t){if(t<=0)throw new RangeError("Argument must be positive.");if(t<.001)return 1/(t*(1+r*t));if(t<12){var e=t,i=0,o=e<1;o?e+=1:e-=i=Math.floor(e)-1;for(var u=0,p=1,f=e-1,c=0;c<8;c++)u=(u+n[c])*f,p=p*f+a[c];var h=u/p+1;if(o)h/=e-1;else for(c=0;c<i;c++)h*=e++;return h}return t>171.624?1/0:Math.exp(s(t))}e.gamma=i;var o=[1/12,-1/360,1/1260,-1/1680,1/1188,-691/360360,1/156,-3617/122400],u=.9189385332046728;function s(t){if(t<=0)throw new RangeError("Argument must be positive.");if(t<12)return Math.log(Math.abs(i(t)));for(var e=1/(t*t),r=o[7],n=6;n>=0;n--)r*=e,r+=o[n];var a=r/t;return(t-.5)*Math.log(t)-t+u+a}e.logGamma=s},2232:function(t,e){e.log1p=function(t){if(t<=-1)throw new RangeError("Argument mustbe greater than -1.0");return Math.abs(t)>1e-4?Math.log(1+t):(-.5*t+1)*t};var r=[0,0,.693147180559945,1.791759469228055,3.178053830347946,4.787491742782046,6.579251212010101,8.525161361065415,10.60460290274525,12.801827480081469,15.104412573075516,17.502307845873887,19.987214495661885,22.55216385312342,25.191221182738683,27.899271383840894,30.671860106080675,33.50507345013689,36.39544520803305,39.339884187199495,42.335616460753485,45.38013889847691,48.47118135183523,51.60667556776438,54.78472939811232,58.00360522298052,61.261701761002,64.55753862700632,67.88974313718153,71.257038967168,74.65823634883016,78.0922235533153,81.55795945611503,85.05446701758152,88.58082754219768,92.13617560368708,95.7196945421432,99.33061245478743,102.96819861451381,106.63176026064345,110.32063971475739,114.03421178146169,117.77188139974506,121.53308151543864,125.31727114935688,129.12393363912724,132.9525750356163,136.80272263732635,140.67392364823425,144.5657439463449,148.47776695177302,152.40959258449735,156.3608363030788,160.33112821663093,164.32011226319517,168.32744544842765,172.35279713916282,176.39584840699737,180.45629141754378,184.5338288614495,188.6281734236716,192.7390472878449,196.86618167288998,201.00931639928157,205.1681994826412,209.34258675253682,213.53224149456327,217.73693411395425,221.95644181913036,226.19054832372757,230.43904356577693,234.70172344281826,238.97838956183435,243.26884900298273,247.5729140961869,251.8904022097232,256.2211355500095,260.5649409718632,264.9216497985528,269.2910976510198,273.6731242856937,278.0675734403661,282.4742926876304,286.893133295427,291.3239500942703,295.7666013507606,300.2209486470141,304.6868567656687,309.1641935801469,313.652829949879,318.1526396202093,322.6634991267262,327.1852877037752,331.7178871969285,336.26118197919845,340.81505887079896,345.37940706226686,349.95411804077025,354.5390855194408,359.13420536957534,363.73937555556347,368.3544960724047,372.979468885689,377.61419787391867,382.25858877306,386.91254912321756,391.5759882173296,396.2488170517915,400.93094827891576,405.6222961611449,410.3227765269373,415.0323067282496,419.7508055995448,424.4781934182571,429.21439186665157,433.95932399501487,438.71291418612117,443.47508812091894,448.2457727453846,453.0248962384961,457.8123879812781,462.6081785268749,467.4121995716081,472.2243839269805,477.0446654925856,481.8729792298879,486.70926113683936,491.553448223298,496.4054784872176,501.26529089157924,506.13282534203483,511.00802266523607,515.8908245878225,520.7811737160442,525.679013515995,530.5842882944336,535.4969431801695,540.4169241059977,545.344177791155,550.2786517242856,555.220294146895,560.1690540372731,565.1248810948744,570.0877257251342,575.0575390247102,580.0342727671308,585.0178793888392,590.0083119756179,595.005524249382,600.0094705553274,605.0201058494238,610.0373856862387,615.0612662070849,620.0917041284774,625.1286567308911,630.1720818478102,635.2219378550598,640.2781836604081,645.340778693435,650.4096828956552,655.4848567108891,660.5662610758735,665.653857411106,670.7476076119127,675.8474740397369,680.9534195136375,686.065407301994,691.1834011144108,696.307365093814,701.4372638087372,706.5730622457875,711.71472580229,716.8622202791034,722.0155118736013,727.1745671728158,732.3393531467393,737.5098371417774,742.6859868743512,747.8677704246434,753.0551562304842,758.2481130813743,763.4466101126402,768.650616799717,773.8601029525585,779.0750387101674,784.2953945352457,789.521141208959,794.7522498258135,799.9886917886435,805.2304388037031,810.4774628758636,815.7297363039102,820.9872316759379,826.2499218648428,831.5177800239063,836.7907795824699,842.0688942417005,847.3520979704384,852.6403650011331,857.9336698258575,863.2319871924054,868.5352921004646,873.8435597978657,879.1567657769076,884.4748857707518,889.7978957498902,895.1257719186799,900.4584907119453,905.7960287916463,911.1383630436112,916.4854705743288,921.8373287078049,927.1939149824767,932.5552071481862,937.9211831632081,943.2918211913357,948.6670995990198,954.0469969525604,959.4314920153495,964.8205637451659,970.2141912915183,975.6123539930362,981.0150313749084,986.4222031463686,991.8338491982234,997.2499496004278,1002.6704845997003,1008.0954346171817,1013.5247802461362,1018.9585022496902,1024.3965815586134,1029.8389992691355,1035.2857366408016,1040.7367750943674,1046.192096209725,1051.6516817238692,1057.115513528895,1062.58357367003,1068.0558443437014,1073.5323078956328,1079.012946818975,1084.4977437524656,1089.9866814786224,1095.4797429219627,1100.976911147256,1106.4781693578009,1111.983500893733,1117.492889230361,1123.0063179765261,1128.5237708729908,1134.045231790853,1139.5706847299848,1145.100113817496,1150.6335033062237,1156.1708375732424];e.logFactorial=function(t){if(t<0)throw new Error("Argument may not be negative.");if(t>254){var e=t+1;return(e-.5)*Math.log(e)-e+.5*Math.log(2*Math.PI)+1/(12*e)}return r[t]}},2412:function(t,e,r){e.Normal=r(2413),e.Studentt=r(2416),e.Uniform=r(2417),e.Binomial=r(2418)},2413:function(t,e,r){var n=r(2188);function a(t,e){if(!(this instanceof a))return new a(t,e);if("number"!=typeof t&&void 0!==t)throw TypeError("mean must be a number");if("number"!=typeof e&&void 0!==e)throw TypeError("sd must be a number");if(void 0!==e&&e<=0)throw TypeError("sd must be positive");this._mean=t||0,this._sd=e||1,this._var=this._sd*this._sd}t.exports=a;a.prototype.pdf=function(t){return Math.exp(-.9189385332046728-Math.log(this._sd)-Math.pow(t-this._mean,2)/(2*this._var))},a.prototype.cdf=function(t){return.5*(1+n.erf((t-this._mean)/Math.sqrt(2*this._var)))},a.prototype.inv=function(t){return-Math.SQRT2*this._sd*n.invErfc(2*t)+this._mean},a.prototype.median=function(){return this._mean},a.prototype.mean=function(){return this._mean},a.prototype.variance=function(){return this._var}},2414:function(t,e,r){var n=r(2231),a=r(2232).log1p;function i(t,e){if(t<0||e<0)throw RangeError("Arguments must be positive.");return 0===t&&0===e?NaN:0===t||0===e?1/0:t+e>170?Math.exp(n.betaln(t,e)):n.gamma(t)*n.gamma(e)/n.gamma(t+e)}function o(t,e,r){var n,a,i,o,u,s,p,f,c,h=1;for(f=e-1,i=1,o=1-(p=e+r)*t/(c=e+1),Math.abs(o)<1e-30&&(o=1e-30),s=o=1/o;h<=100&&(o=1+(a=h*(r-h)*t/((f+(n=2*h))*(e+n)))*o,Math.abs(o)<1e-30&&(o=1e-30),i=1+a/i,Math.abs(i)<1e-30&&(i=1e-30),s*=(o=1/o)*i,o=1+(a=-(e+h)*(p+h)*t/((e+n)*(c+n)))*o,Math.abs(o)<1e-30&&(o=1e-30),i=1+a/i,Math.abs(i)<1e-30&&(i=1e-30),s*=u=(o=1/o)*i,!(Math.abs(u-1)<3e-7));h++);return s}function u(t,e,r){if(t<0||t>1)throw new RangeError("First argument must be between 0 and 1.");if(1===e&&1===r)return t;if(0===t)return 0;if(1===t)return 1;if(0===e)return 1;if(0===r)return 0;var i=Math.exp(n.logGamma(e+r)-n.logGamma(e)-n.logGamma(r)+e*Math.log(t)+r*a(-t));return t<(e+1)/(e+r+2)?i*o(t,e,r)/e:1-i*o(1-t,r,e)/r}e.beta=i,e.logBeta=function(t,e){if(t<0||e<0)throw RangeError("Arguments must be positive.");return 0===t&&0===e?NaN:0===t||0===e?1/0:n.logGamma(t)+n.logGamma(e)-n.logGamma(t+e)},e.incBeta=function(t,e,r){return u(t,e,r)*i(e,r)},e.invIncBeta=function(t,e,r){if(c<0||c>1)throw new RangeError("First argument must be between 0 and 1.");if(1===e&&1===r)return t;if(1===t)return 1;if(0===t)return 0;if(0===e)return 0;if(0===r)return 1;var i,o,s,p,f,c,h,l,m,b,d=e-1,g=r-1,v=0;for(e>=1&&r>=1?(s=t<.5?t:1-t,c=(2.30753+.27061*(p=Math.sqrt(-2*Math.log(s))))/(1+p*(.99229+.04481*p))-p,t<.5&&(c=-c),h=(c*c-3)/6,l=2/(1/(2*e-1)+1/(2*r-1)),m=c*Math.sqrt(h+l)/l-(1/(2*r-1)-1/(2*e-1))*(h+5/6-2/(3*l)),c=e/(e+r*Math.exp(2*m))):(i=Math.log(e/(e+r)),o=Math.log(r/(e+r)),c=t<(p=Math.exp(e*i)/e)/(m=p+(f=Math.exp(r*o)/r))?Math.pow(e*m*t,1/e):1-Math.pow(r*m*(1-t),1/r)),b=-n.logGamma(e)-n.logGamma(r)+n.logGamma(e+r);v<10;v++){if(0===c||1===c)return c;if((c-=p=(f=(u(c,e,r)-t)/(p=Math.exp(d*Math.log(c)+g*a(-c)+b)))/(1-.5*Math.min(1,f*(d/c-g/(1-c)))))<=0&&(c=.5*(c+p)),c>=1&&(c=.5*(c+p+1)),Math.abs(p)<1e-8*c&&v>0)break}return c}},2415:function(t,e){var r=[.254829592,-.284496736,1.421413741,-1.453152027,1.061405429],n=.3275911;e.erf=function(t){var e=1;t<0&&(e=-1),t=Math.abs(t);var a=1/(1+n*t);return e*(1-((((r[4]*a+r[3])*a+r[2])*a+r[1])*a+r[0])*a*Math.exp(-t*t))};var a=1.1283791670955126,i=[-2.8e-17,1.21e-16,-9.4e-17,-1.523e-15,7.106e-15,3.81e-16,-1.12708e-13,3.13092e-13,8.94487e-13,-6.886027e-12,2.394038e-12,9.6467911e-11,-2.27365122e-10,-9.91364156e-10,5.059343495e-9,6.529054439e-9,-8.5238095915e-8,1.5626441722e-8,130365583558e-17,-1624290004647e-18,-20278578112534e-18,42523324806907e-18,.000366839497852761,-.000946595344482036,-.00956151478680863,.019476473204185836,.6419697923564902,-1.3026537197817094],o=i[i.length-1];function u(t){function e(t){for(var e=0,r=0,n=0,a=2/(2+t),u=4*a-2,s=0,p=i.length-1;s<p;s++)n=e,e=u*e-r+i[s],r=n;return a*Math.exp(-t*t+.5*(o+u*e)-r)}return t>=0?e(t):2-e(-t)}function s(t){if(t<0||t>2)throw RangeError("Argument must be betweeen 0 and 2");if(0===t)return 1/0;if(2===t)return-1/0;var e=t<1?t:2-t,r=Math.sqrt(-2*Math.log(e/2)),n=-.70711*((2.30753+.27061*r)/(1+r*(.99229+.04481*r))-r),i=u(n)-e,o=u(n+=i/(a*Math.exp(-n*n)-n*i))-e;return n+=o/(a*Math.exp(-n*n)-n*o),t<1?n:-n}e.erfc=u,e.invErfc=s,e.invErf=function(t){if(t<-1||t>1)throw RangeError("Argument must be betweeen -1 and 1");return-s(t+1)}},2416:function(t,e,r){var n=r(2188);function a(t){if(!(this instanceof a))return new a(t);if("number"!=typeof t)throw TypeError("mean must be a number");if(t<=0)throw RangeError("df must be a positive number");this._df=t,this._pdf_const=n.gamma((t+1)/2)/(Math.sqrt(t*Math.PI)*n.gamma(t/2)),this._pdf_exp=-(t+1)/2,this._df_half=t/2}t.exports=a,a.prototype.pdf=function(t){return this._pdf_const*Math.pow(1+t*t/this._df,this._pdf_exp)},a.prototype.cdf=function(t){var e=Math.sqrt(t*t+this._df);return n.incBeta((t+e)/(2*e),this._df_half,this._df_half)},a.prototype.inv=function(t){var e=n.invIncBeta(2*Math.min(t,1-t),this._df_half,.5),r=Math.sqrt(this._df*(1-e)/e);return t>.5?r:-r},a.prototype.median=function(){return 0},a.prototype.mean=function(){return this._df>1?0:void 0},a.prototype.variance=function(){return this._df>2?this._df/(this._df-2):this._df>1?1/0:void 0}},2417:function(t,e){function r(t,e){if(!(this instanceof r))return new r(t,e);if("number"!=typeof t&&void 0!==t)throw TypeError("mean must be a number");if("number"!=typeof e&&void 0!==e)throw TypeError("sd must be a number");if(this._a="number"==typeof t?t:0,this._b="number"==typeof e?e:1,this._b<=this._a)throw new RangeError("a must be greater than b");this._k=1/(this._b-this._a),this._mean=(this._a+this._b)/2,this._var=(this._a-this._b)*(this._a-this._b)/12}t.exports=r,r.prototype.pdf=function(t){return t<this._a||t>this._b?0:this._k},r.prototype.cdf=function(t){return t<this._a?0:t>this._b?1:(t-this._a)*this._k},r.prototype.inv=function(t){return t<0||t>1?NaN:t*(this._b-this._a)+this._a},r.prototype.median=function(){return this._mean},r.prototype.mean=function(){return this._mean},r.prototype.variance=function(){return this._var}},2418:function(t,e,r){var n=r(2188);function a(t,e){if(!(this instanceof a))return new a(t,e);if("number"!=typeof t)throw TypeError("properbility must be a number");if("number"!=typeof e)throw TypeError("size must be a number");if(e<=0)throw TypeError("size must be positive");if(t<0||t>1)throw TypeError("properbility must be between 0 and 1");this._properbility=t,this._size=e}t.exports=a,a.prototype.pdf=function(t){var e=this._size,r=this._properbility;return n.gamma(e+1)/(n.gamma(t+1)*n.gamma(e-t+1))*Math.pow(r,t)*Math.pow(1-r,e-t)},a.prototype.cdf=function(t){return n.incBeta(1-this._properbility,this._size-t,t+1)},a.prototype.inv=function(t){throw new Error("Inverse CDF of binomial distribution is not implemented")},a.prototype.median=function(){return Math.round(this._properbility*this._size)},a.prototype.mean=function(){return this._properbility*this._size},a.prototype.variance=function(){return this._properbility*this._size*(1-this._properbility)}},2469:function(t,e,r){"use strict";r.r(e);var n=r(0),a=r.n(n),i=r(1),o=r.n(i),u=r(2412),s=r.n(u),p=r(146);var f=a.a.arrayOf(a.a.shape({group:a.a.arrayOf(a.a.string),values:a.a.arrayOf(a.a.shape({x:a.a.number,y:a.a.number}))})),c={alpha:a.a.number,data:f.isRequired,groups:a.a.arrayOf(a.a.string).isRequired,liftValPrec:a.a.number,metric:a.a.string.isRequired,pValPrec:a.a.number},h=function(t){function e(e){var r;return(r=t.call(this,e)||this).state={control:0,liftValues:[],pValues:[]},r}!function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}(e,t);var r=e.prototype;return r.componentWillMount=function(){var t=this.state.control;this.computeTTest(t)},r.getLiftStatus=function(t){var e=this.state,r=e.control,n=e.liftValues;if(t===r)return"control";var a=n[t];return Number.isNaN(a)||!Number.isFinite(a)?"invalid":0<=a?"true":"false"},r.getPValueStatus=function(t){var e=this.state,r=e.control,n=e.pValues;if(t===r)return"control";var a=n[t];return Number.isNaN(a)||!Number.isFinite(a)?"invalid":""},r.getSignificance=function(t){var e=this.state,r=e.control,n=e.pValues,a=this.props.alpha;return t===r?"control":n[t]<=a},r.computeLift=function(t,e){for(var r=this.props.liftValPrec,n=0,a=0,i=0;i<t.length;i++)n+=t[i].y,a+=e[i].y;return((n-a)/a*100).toFixed(r)},r.computePValue=function(t,e){for(var r,n=this.props.pValPrec,a=0,i=0,o=0,u=0;u<t.length;u++)r=e[u].y-t[u].y,isFinite(r)&&(o++,a+=r,i+=r*r);var p=-Math.abs(a*Math.sqrt((o-1)/(o*i-a*a)));try{return(2*new s.a.Studentt(o-1).cdf(p)).toFixed(n)}catch(t){return NaN}},r.computeTTest=function(t){var e=this.props.data,r=[],n=[];if(e){for(var a=0;a<e.length;a++)a===t?(r.push("control"),n.push("control")):(r.push(this.computePValue(e[a].values,e[t].values)),n.push(this.computeLift(e[a].values,e[t].values)));this.setState({control:t,liftValues:n,pValues:r})}},r.render=function(){var t=this,e=this.props,r=e.data,n=e.metric,a=e.groups,i=this.state,u=i.control,s=i.liftValues,f=i.pValues,c=a.map(function(t,e){return o.a.createElement(p.Th,{key:e,column:t},t)}),h=a.length;c.push(o.a.createElement(p.Th,{key:h+1,column:"pValue"},"p-value")),c.push(o.a.createElement(p.Th,{key:h+2,column:"liftValue"},"Lift %")),c.push(o.a.createElement(p.Th,{key:h+3,column:"significant"},"Significant"));var l=r.map(function(e,r){var n=a.map(function(t,r){return o.a.createElement(p.Td,{key:r,column:t,data:e.group[r]})});return n.push(o.a.createElement(p.Td,{key:h+1,className:t.getPValueStatus(r),column:"pValue",data:f[r]})),n.push(o.a.createElement(p.Td,{key:h+2,className:t.getLiftStatus(r),column:"liftValue",data:s[r]})),n.push(o.a.createElement(p.Td,{key:h+3,className:t.getSignificance(r),column:"significant",data:t.getSignificance(r)})),o.a.createElement(p.Tr,{key:r,onClick:t.computeTTest.bind(t,r),className:r===u?"control":""},n)}),m=a.concat([{column:"pValue",sortFunction:function(t,e){return"control"===t?-1:"control"===e?1:t>e?1:-1}},{column:"liftValue",sortFunction:function(t,e){return"control"===t?-1:"control"===e?1:parseFloat(t)>parseFloat(e)?-1:1}},{column:"significant",sortFunction:function(t,e){return"control"===t?-1:"control"===e?1:t>e?-1:1}}]);return o.a.createElement("div",null,o.a.createElement("h3",null,n),o.a.createElement(p.Table,{className:"table",id:"table_"+n,sortable:m},o.a.createElement(p.Thead,null,c),l))},e}(o.a.Component);h.propTypes=c,h.defaultProps={alpha:.05,liftValPrec:4,pValPrec:6};var l=h;var m={alpha:a.a.number,className:a.a.string,data:a.a.objectOf(f).isRequired,groups:a.a.arrayOf(a.a.string).isRequired,liftValPrec:a.a.number,metrics:a.a.arrayOf(a.a.string).isRequired,pValPrec:a.a.number},b=function(t){function e(){return t.apply(this,arguments)||this}return function(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}(e,t),e.prototype.render=function(){var t=this.props,e=t.className,r=t.metrics,n=t.groups,a=t.data,i=t.alpha,u=t.pValPrec,s=t.liftValPrec;return o.a.createElement("div",{className:"superset-legacy-chart-paired-t-test "+e},o.a.createElement("div",{className:"paired-ttest-table scrollbar-container"},o.a.createElement("div",{className:"scrollbar-content"},r.map(function(t,e){return o.a.createElement(l,{key:e,metric:t,groups:n,data:a[t],alpha:i,pValPrec:Math.min(u,32),liftValPrec:Math.min(s,32)})}))))},e}(o.a.PureComponent);b.propTypes=m,b.defaultProps={alpha:.05,className:"",liftValPrec:4,pValPrec:6};e.default=b}}]);