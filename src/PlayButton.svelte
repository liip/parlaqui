<style>
	button {
        width: 260px;
        height: 260px;
        border-radius: 50%;
        animation: shadow-pulse 1s infinite;
        color: white;
        background: #6EA644; 
	}

    @keyframes shadow-pulse
    {
        0% {
            box-shadow: 0 0 0 0px rgba(110,166,68, 0.2);
        }
        100% {
            box-shadow: 0 0 0 35px rgba(0, 0, 0, 0);
        }
    }
</style>

<button on:click>
    <slot />
</button>
