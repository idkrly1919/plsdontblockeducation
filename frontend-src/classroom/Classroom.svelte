<script lang="ts">
    let { enterApp }: { enterApp: () => void } = $props();
</script>

<div class="min-h-screen bg-gray-100 flex flex-col">
    <header class="bg-white shadow-sm p-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600"><path d="M4 6h16M4 12h16M4 18h16"></path></svg>
            <div class="flex items-center gap-2">
                <img src="/Google_Classroom_Logo.svg.png" alt="Classroom" class="w-6 h-6">
                <span class="text-xl text-gray-700">Classroom</span>
            </div>
        </div>
        <button 
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            onclick={enterApp}
        >
            Enter App
        </button>
    </header>
    <main class="flex-1 p-8 text-center text-gray-800">
        <h1 class="text-2xl font-bold mb-4">Welcome to the Classroom</h1>
        <p>Click "Enter App" to continue to the proxy.</p>
    </main>
</div>