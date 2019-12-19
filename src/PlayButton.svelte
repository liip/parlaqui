<style>
	button {
        font-size: larger;
        width: 220px;
        height: 220px;
        border-radius: 50%;
        animation: shadow-pulse 2s infinite;
        animation-delay: 3.5s;
        color: white;
        background: #2c3e50;
        margin-bottom: 2rem;
	}
    
    @keyframes shadow-pulse
    {
        0% {
            box-shadow: 0 0 0 0px rgba(44,62,80, 0.2);
        }
        100% {
            box-shadow: 0 0 0 35px rgba(44,62,80, 0);
        }
    }
</style>

<button on:click>
    <slot />
</button>
