export default function Test() {
 return (
    <body className="bg-gray-100 min-h-screen font-sans">
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8 text-gray-800">Dropdown Menu Example</h1>
        
        {/* <!-- Dropdown Container --> */}
        <div className="flex justify-center">
            <div className="relative inline-block text-left">
                {/* <!-- Dropdown Button --> */}
                <button id="dropdownButton" 
                        className="inline-flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md"
                        type="button">
                    Menu
                    <svg className="w-5 h-5 ml-2 -mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                </button>
                
                {/* <!-- Dropdown Content (hidden by default) --> */}
                <div id="dropdownMenu" 
                     className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg hidden dropdown-content">
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            Dashboard
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            Team
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            Projects
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            Calendar
                        </a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                            Reports
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- JavaScript for dropdown functionality --> */}
    <script src="./test.js"></script>
</body>
 )   
}