<script lang="ts">
    import { Menu, Plus, Grip, Search, User } from 'lucide-svelte';
    
    let { enterApp }: { enterApp: () => void } = $props();

    const classes = [
        { name: "AP World History", section: "Period 2", teacher: "Mr. Smith", bg: "bg-orange-500", letter: "H" },
        { name: "Calculus BC", section: "Period 3", teacher: "Ms. Johnson", bg: "bg-blue-600", letter: "C" },
        { name: "American Literature", section: "Period 4", teacher: "Mrs. Davis", bg: "bg-emerald-600", letter: "L" },
        { name: "Physics 1", section: "Period 6", teacher: "Mr. Wilson", bg: "bg-purple-600", letter: "P" },
        { name: "Chemistry", section: "Period 1", teacher: "Mr. Brown", bg: "bg-red-500", letter: "C" },
        { name: "Gym", section: "Period 5", teacher: "Coach Miller", bg: "bg-yellow-600", letter: "G" },
    ];
</script>

<div class="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 h-16 px-4 flex items-center justify-between sticky top-0 z-50">
        <div class="flex items-center gap-4">
            <button class="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <Menu size={24} />
            </button>
            <div class="flex items-center gap-2 cursor-pointer hover:underline decoration-transparent hover:decoration-current transition-all">
                <div class="w-8 h-8 flex items-center justify-center">
                    <img src="/Google_Classroom_Logo.svg.png" alt="Logo" class="w-6 h-6 object-contain" onerror="this.style.display='none'" />
                </div>
                <span class="text-xl text-gray-600 hover:text-blue-600 font-medium leading-none pt-1">Classroom</span>
            </div>
        </div>
        
        <div class="flex items-center gap-1 sm:gap-2">
            <button class="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hidden sm:block">
                <Plus size={24} />
            </button>
            <button class="p-3 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                <Grip size={24} />
            </button>
            <div class="ml-1 sm:ml-2 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-medium cursor-pointer hover:ring-4 hover:ring-gray-100 transition-all">
                S
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div class="max-w-[100rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {#each classes as cls}
                <button 
                    class="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 text-left flex flex-col h-72 group cursor-pointer relative"
                    onclick={enterApp}
                >
                    <!-- Card Header -->
                    <div class="{cls.bg} h-24 p-4 text-white relative flex flex-col justify-between w-full">
                        <div class="flex justify-between items-start w-full">
                            <div class="hover:underline cursor-pointer min-w-0 pr-2">
                                <h2 class="text-xl font-medium leading-snug truncate group-hover:underline">{cls.name}</h2>
                                <p class="text-xs sm:text-sm opacity-90 truncate">{cls.section}</p>
                            </div>
                            <button class="text-white opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity p-1 hover:bg-black/10 rounded-full shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                            </button>
                        </div>
                        <p class="text-xs font-medium opacity-90 truncate">{cls.teacher}</p>
                    </div>
                    
                    <!-- Card Body -->
                    <div class="flex-1 p-4 relative w-full">
                        <!-- Profile Bubble -->
                        <div class="absolute top-0 right-4 -translate-y-1/2 w-16 h-16 rounded-full {cls.bg} border-[1px] border-white/10 text-white flex items-center justify-center text-3xl font-normal shadow-sm">
                            {cls.letter}
                        </div>
                        
                        <!-- Invisible content to push footer down -->
                        <div class="mt-12 space-y-2"></div>
                    </div>

                    <!-- Card Footer -->
                    <div class="border-t border-gray-200 p-2 flex justify-end gap-1 w-full mt-auto">
                         <button class="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10v6"/><path d="M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                         </button>
                         <button class="p-2.5 hover:bg-gray-100 rounded-full text-gray-600 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                         </button>
                    </div>
                </button>
            {/each}
        </div>
    </main>
</div>