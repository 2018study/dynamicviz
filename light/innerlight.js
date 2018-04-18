
function AnimatedInnerLightDom(dom, liGradientId, beginTimeIndex, duration, resetTimeIndex){

	this.init = function(dom, liGradientId, beginTimeIndex, duration, resetTimeIndex){
		var dom = $(dom.node());
		//copy as light ghost dom
		var lightDom = $(dom).clone();
		this._beginTimeIndex = beginTimeIndex;
		this._resetTimeIndex = resetTimeIndex;
		this._duration = duration;
		this._liGradientId = liGradientId;

		$(dom).parent().append(lightDom)
		this._lightDom = d3.select(lightDom[0])
		.attr('class', 'lighting')
		.attr('beginTimeIndex', beginTimeIndex)
		.attr('currentTimeIndex', 0)
		.attr('resetTimeIndex', resetTimeIndex)
		.attr('duration', duration)
		.style('fill', function(){
			// var gradientId = liGradientId[0];
			// return 'url(' + '#' + gradientId + ')';
			return 'none'
		});

		console.log(' reset time index ', resetTimeIndex);
	}

	this.getLightDom = function(){
		return this._lightDom;
	}

	this.animatebyTimeIndex = function(currentTimeIndex){
		if(currentTimeIndex < this._beginTimeIndex) //beginTimeIndex)
			return;
		if(currentTimeIndex >= (this._beginTimeIndex + liGradientId.length * duration)){
			if(currentTimeIndex >= this._resetTimeIndex){
				console.log(" here ?! ");
				this._lightDom.style('fill', function(){
					var gradientId = liGradientId[liGradientId.length - 1];
					return 'none';
				});
			}else{
				this._lightDom.style('fill', function(){
					var gradientId = liGradientId[liGradientId.length - 1];
					return 'url(' + '#' + gradientId + ')';
				});
			}
		}else{
			this._lightDom.style('fill', function(){				
				var gradientId = liGradientId[Math.floor((currentTimeIndex - beginTimeIndex)/duration)];
				return 'url(' + '#' + gradientId + ')';
			})
		}
	}

	this.init(dom, liGradientId, beginTimeIndex, duration, resetTimeIndex);

	return this;
}
