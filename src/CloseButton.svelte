<style>
    button {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        margin: 1rem 1rem 0 0;
        border: 1px solid white;
        background-color: white;
    }
    button:hover {
        box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.15);
        border-color: #bbb;
    }
    svg path {
        stroke: #ccc;
    }
</style>
<button on:click title="abbrechen">
    <svg viewBox="0 0 10 10">
        <path d="
            M1,1
            L9,9
            M9,1
            L1,9
            " 
    />
    </svg>
</button>
