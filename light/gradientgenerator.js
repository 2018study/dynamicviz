function GradientGenerator(){
	
	this._gradientNextId = 0;

	this.init = function(){
		//append a svg to define gradient light
		this._defs = d3.select('svg')
					   .append('svg')
	}

	this.getValidNextGradientId = function(){
		return 'gradient-' + (this._gradientNextId ++);
	}

	this.getSingleAlphaWhiteLights = function(intervalStepNum, alpha, beginOffset, endOffset, lineDir){
		var liLinearColor = [
			'rgba(255, 255, 255,' + alpha + ')',
			'rgba(255, 255, 255, 0.0)',	
		];
		if(beginOffset == undefined) beginOffset = 0;
		if(endOffset == undefined) endOffset = 100;
		if(lineDir == undefined)
			lineDir = {x1: 0, x2: 0, y1: 0, y2: 100};
		var liLinearOffset_Begin = [0, beginOffset]
		var liLinearOffset_End = [0, endOffset]
		return this.defineLights('linear', liLinearColor, liLinearOffset_Begin, liLinearOffset_End, intervalStepNum, lineDir);
	}


	this.getSingleWhiteLights = function(intervalStepNum, beginOffset, endOffset, lineDir){
		var liLinearColor = [
			'rgba(255, 255, 255, 1.)',
			'rgba(255, 255, 255, 0.0)',	
		];
		if(beginOffset == undefined) beginOffset = 0;
		if(endOffset == undefined) endOffset = 100;
		if(lineDir == undefined)
			lineDir = {x1: 0, x2: 0, y1: 0, y2: 100};
		var liLinearOffset_Begin = [0, beginOffset]
		var liLinearOffset_End = [0, endOffset]
		return this.defineLights('linear', liLinearColor, liLinearOffset_Begin, liLinearOffset_End, intervalStepNum, lineDir);
	}

	this.getSingleGrayLights = function(intervalStepNum){
		var liLinearColor = [
			'rgba(155, 155, 155, 1.0)',
			'rgba(255, 255, 255, 0.0)',	
		];
		var liLinearOffset_Begin = [0, 30]
		var liLinearOffset_End = [0, 80]
		return this.defineLights('linear', liLinearColor, liLinearOffset_Begin, liLinearOffset_End, intervalStepNum);
	}

	this.getBiWhiteLights = function(intervalStepNum, lightness=1.){
		var liLinearColor = [
			'rgba(255, 255, 255, 0.0)',
			'rgba(255, 255, 255, ' + lightness + ')',
			'rgba(255, 255, 255, 0.0)',			
		]
		var liLinearOffset_Begin = [0, 0, 100]
		var liLinearOffset_End = [0, 100, 100]
		return this.defineLights('linear', liLinearColor, liLinearOffset_Begin, liLinearOffset_End, intervalStepNum);
	}

	this.getRadialYellowLights = function(intervalStepNum){
		var liColor = [
			 "rgba(244, 206, 66, .3)" ,
			'rgba(255, 255, 255, .0)',
		]

		var liOffset_Begin = [0, 0];
		var liOffset_End = [0, 100];
		return this.defineLights('radial', liColor, liOffset_Begin, liOffset_End, intervalStepNum);		
	}

	this.getRadialWhiteLights = function(intervalStepNum){

		var liColor = [
			'rgba(255, 255, 255, 0.999)',
			'rgba(255, 255, 255, .0)',
		]

		var liOffset_Begin = [0, 0];
		var liOffset_End = [0, 100];
		return this.defineLights('radial', liColor, liOffset_Begin, liOffset_End, intervalStepNum);		
	}

	this.getRadialYellowLights2 = function(intervalStepNum){

		var liColor = [
			 "rgba(0, 0, 0, 0.9)",
		     "rgba(0, 0, 0, .0)",
		]

		var liOffset_Begin = [0, 0];
		var liOffset_End = [0, 100];
		
		return this.defineLights('radial', liColor, liOffset_Begin, liOffset_End, intervalStepNum);		
	}
	
	this.defineLights = function(shape, liColor, liOffset_Begin, liOffset_End, intervalStepNum, lineDir){
		if(lineDir == undefined){
			lineDir = {x1: 0, x2: 0, y1: 0, y2: 100};
		}
		var liGradientDefId = [];
		var liOffsetDelta = this.computeOffsetDelta(liOffset_Begin, liOffset_End, intervalStepNum);
		switch(shape){
			case 'linear':
				for(var i = 0; i < intervalStepNum; i ++){  
				    var liOutColor = [];
				    for(var j = 0; j < liOffsetDelta.length; j ++){
				    	liOutColor.push({
				    		'stop-color': liColor[j],
				    		'offset': liOffset_Begin[j] + liOffsetDelta[j] * i + '%'
				    	});
				    }
			      	liGradientDefId.push(this.setLinearLight(liOutColor, lineDir));
			    }
				return liGradientDefId;
			case 'radial': 
				for(var i = 0; i <= intervalStepNum; i ++){  
				    var liOutColor = [];
				    for(var j = 0; j < liOffsetDelta.length; j ++){
				    	liOutColor.push({
				    		'stop-color': liColor[j],
				    		'offset': liOffset_Begin[j] + liOffsetDelta[j] * i + '%'
				    	});
				    }
			      	liGradientDefId.push(this.setRadialGradient(liOutColor));
			    }
				return liGradientDefId;
		}
		return liGradientDefId;
	}
	this.computeOffsetDelta = function(liOffset_Begin, liOffset_End, intervalStepNum){
		var liOffsetDetla = [];
		var len = liOffset_Begin.length;
		if(len > liOffset_End.length)
			len = liOffset_End.length;
		for(var i = 0; i < len; i ++){
			liOffsetDetla.push((liOffset_End[i] - liOffset_Begin[i])/intervalStepNum)
		}
		return liOffsetDetla;
	}
	this.setLinearLight = function(liPerColor, lineDir){
		if(lineDir == undefined){
			lineDir = {x1: 0, x2: 0, y1: 0, y2: 100};
		}
		var linearGradientId = this.getValidNextGradientId();
		var linearGradient = this._defs
			.append('linearGradient')
			.attr('id', linearGradientId)
			.attr('x1', lineDir.x1 + '%')
			.attr('x2', lineDir.x2 + '%')
			.attr('y1', lineDir.y1 + '%')
			.attr('y2', lineDir.y2 + '%');     
                
		for (var i = 0; i < liPerColor.length; i ++) {
	        var offset = liPerColor[i]['offset']
	        var color = liPerColor[i]['stop-color']
	        linearGradient.append('stop')
	        .attr('offset', offset)
	        .attr('stop-color', color);
	    }; 
		return linearGradientId;
	}
	this.setRadialGradient = function(liPerColor){
		var radialGradientID = this.getValidNextGradientId();
	    var radialGradient = this._defs
	        .append("radialGradient")
	        .attr("id", radialGradientID);

	    for (var i = 0; i < liPerColor.length; i ++) {
	        var offset = liPerColor[i]['offset']
	        var color = liPerColor[i]['stop-color']
	        radialGradient.append('stop')
	        .attr('offset', offset)
	        .attr('stop-color', color);
	    }; 
	    return radialGradientID;
	}
	this.init();
	return this;
}