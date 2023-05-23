<template>
    <div>
        <div class="loader">
            <svg class="svg-loader" id="wave" data-name="Layer 5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 38.05">
                <path id="Line_1" data-name="Line 1" d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z"/>
                <path id="Line_2" data-name="Line 2" d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z"/>
                <path id="Line_3" data-name="Line 3" d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z"/>
                <path id="Line_4" data-name="Line 4" d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z"/>
                <path id="Line_5" data-name="Line 5" d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z"/>
                <path id="Line_6" data-name="Line 6" d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z"/>
                <path id="Line_7" data-name="Line 7" d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-1H42.91Z"/>
            </svg>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.loader {
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
}

.svg-loader {
	-webkit-backface-visibility: hidden;
    -webkit-perspective: 1000;
    -webkit-transform: translate3d(0,0,0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    perspective: 1000;
    transform: translate3d(0,0,0);
    transform: translateZ(0);
}

#wave {
	height: 100%;
	width: 100%;
	
}

@for $i from 1 through 7 {
	#Line_#{$i} {
		animation: pulse 1s infinite;
		animation-delay: $i * .15s;
        fill: #3fabf3;
        @if ($i == 2) or ($i == 6) {
            fill: #FFF;
        }
	}
    
}

@keyframes pulse {
	0% {
		transform: scaleY(1);
		transform-origin: 50% 50%;
	}
	
	50% {
		transform: scaleY(.7);
		transform-origin: 50% 50%;
	}
	
	100% {
		transform: scaleY(1);
		transform-origin: 50% 50%;
	}
}
</style>
