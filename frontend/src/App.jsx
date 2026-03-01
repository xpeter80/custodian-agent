import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import InstructionRecognition from './pages/InstructionRecognition'
import PositionEstimation from './pages/PositionEstimation'
import Reconciliation from './pages/Reconciliation'
import InvestmentSupervision from './pages/InvestmentSupervision'
import { useState } from 'react'

function App() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    return (
        <div className="flex h-screen w-screen bg-midnight-950 overflow-hidden">
            {/* Ambient Light Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-copper-900/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-900/5 blur-[100px]"></div>
            </div>

            {/* Sidebar */}
            <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative z-10">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/instruction" element={<InstructionRecognition />} />
                        <Route path="/position" element={<PositionEstimation />} />
                        <Route path="/reconciliation" element={<Reconciliation />} />
                        <Route path="/supervision" element={<InvestmentSupervision />} />
                    </Routes>
                </main>
            </div>
        </div>
    )
}

export default App
