import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
    FileText, UploadCloud, CheckCircle, ShieldAlert,
    Search, Shield, AlertTriangle, FileUp, Settings,
    Clock, Check, ChevronRight, Activity, Percent, ArrowRight
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import MetricCard from '../components/MetricCard';
import { supervisionData } from '../data/mockData';

const InvestmentSupervision = () => {
    const { t, i18n } = useTranslation();
    const lang = i18n.language === 'en' ? 'en' : 'zh';

    // State for the 3-step workflow
    const [currentStep, setCurrentStep] = useState(1); // 1: Upload, 2: Extracting, 3: Results

    // Upload State
    const [isDragging, setIsDragging] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);

    // Extraction State
    const [extractionStage, setExtractionStage] = useState(0);
    const [visibleRules, setVisibleRules] = useState([]);
    const [highlightedClause, setHighlightedClause] = useState(null);
    const [isExtracting, setIsExtracting] = useState(false);

    const textContainerRef = useRef(null);

    // Helper to format rule types
    const getRuleTypeOptions = () => ({
        ratio: t('supervision.ruleTypes.ratio', 'Ratio Limit'),
        concentration: t('supervision.ruleTypes.concentration', 'Concentration Limit'),
        credit: t('supervision.ruleTypes.credit', 'Credit Rating'),
        duration: t('supervision.ruleTypes.duration', 'Duration Limit'),
        liquidity: t('supervision.ruleTypes.liquidity', 'Liquidity Requirement'),
        prohibited: t('supervision.ruleTypes.prohibited', 'Prohibited Investment')
    });

    const ruleTypeOptions = getRuleTypeOptions();

    // --- Step 1: Upload Handlers ---
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFileUpload(e.dataTransfer.files[0]);
        }
    };

    const handleFileInput = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFileUpload(e.target.files[0]);
        }
    };

    const handleFileUpload = (file) => {
        setUploadedFile({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
            type: file.type
        });
        // Move to extraction step
        setTimeout(() => {
            startExtraction();
        }, 800);
    };

    const handleUseDemo = () => {
        setUploadedFile({
            name: supervisionData.contractMeta.name[lang] + '.pdf',
            size: '2.4 MB',
            type: 'application/pdf'
        });
        startExtraction();
    };

    // --- Step 2: Extraction Simulation ---
    const startExtraction = () => {
        setCurrentStep(2);
        setIsExtracting(true);
        setExtractionStage(0);
        setVisibleRules([]);
        setHighlightedClause(null);

        let stage = 0;
        const stages = supervisionData.extractionStages || [
            { duration: 1000 }, { duration: 1500 }, { duration: 2500 }, { duration: 1000 }
        ];

        const runStage = () => {
            if (stage >= stages.length) {
                setIsExtracting(false);
                setTimeout(() => setCurrentStep(3), 1000);
                return;
            }

            setExtractionStage(stage);

            // If we are in the "extracting" stage (stage 2), show rules sequentially
            if (stage === 2) {
                let ruleIndex = 0;
                const ruleInterval = setInterval(() => {
                    if (ruleIndex < supervisionData.extractedRules.length) {
                        const rule = supervisionData.extractedRules[ruleIndex];
                        setVisibleRules(prev => [...prev, rule]);
                        setHighlightedClause(rule.clause[lang]);

                        // Try to scroll to the highlighted clause (mock simulation)
                        if (textContainerRef.current) {
                            textContainerRef.current.scrollTop += 30; // simple mock scroll
                        }

                        ruleIndex++;
                    } else {
                        clearInterval(ruleInterval);
                        setHighlightedClause(null);
                    }
                }, stages[stage].duration / supervisionData.extractedRules.length);
            }

            setTimeout(() => {
                stage++;
                runStage();
            }, stages[stage].duration);
        };

        runStage();
    };

    // Replace text with highlighted spans based on current active rule
    const renderContractText = (text) => {
        if (!text) return null;

        if (currentStep === 2 && isExtracting) {
            const keywords = {
                'zh': ['80%', '30%', '5%', '10%', '20%', '不得进行融资融券', '关联方', '担保或融资', '1.00%', '0.20%'],
                'en': ['80%', '30%', '5%', '10%', '20%', 'Margin trading', 'related party', 'guarantees', '1.00%', '0.20%']
            }[lang];

            // Build a regex to match any of the keywords
            const regex = new RegExp(`(${keywords.map(kw => kw.replace(/[.*+?^$\\{}()|[\\]\\\\]/g, '\\$&')).join('|')})`, 'g');

            // Split the text by the regex. The capture group ensures the matches are included in the split array.
            const parts = text.split(regex);

            return (
                <div className="whitespace-pre-wrap leading-relaxed text-sm text-gray-300">
                    {parts.map((part, i) => {
                        if (keywords.includes(part)) {
                            return <span key={i} className="bg-copper-500/30 text-copper-300 rounded px-1 animate-pulse-glow transition-all">{part}</span>;
                        }
                        return <span key={i}>{part}</span>;
                    })}
                </div>
            );
        }

        return <div className="whitespace-pre-wrap leading-relaxed text-sm text-gray-300">{text}</div>;
    };


    return (
        <div className="p-6 h-full flex flex-col space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-semibold text-white mb-2 flex items-center">
                        <Shield className="w-6 h-6 mr-2 text-copper-500" />
                        {t('supervision.title', 'Investment Supervision Rule Extraction')}
                    </h1>
                    <p className="text-gray-400">
                        {t('supervision.subtitle', 'Intelligent contract analysis with automated rule extraction and indicator generation')}
                    </p>
                </div>
            </div>

            {/* Progress Steps */}
            <div className="w-full flex justify-center py-4">
                <div className="flex items-center space-x-4">
                    <div className={`flex items-center space-x-2 ${currentStep >= 1 ? 'text-copper-400' : 'text-gray-500'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-copper-500 bg-copper-500/20' : 'border-gray-600'}`}>1</div>
                        <span className="font-medium">{t('supervision.steps.step1', '导入合同')}</span>
                    </div>
                    <div className={`w-12 h-0.5 ${currentStep >= 2 ? 'bg-copper-500' : 'bg-gray-700'}`}></div>
                    <div className={`flex items-center space-x-2 ${currentStep >= 2 ? 'text-copper-400' : 'text-gray-500'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-copper-500 bg-copper-500/20' : 'border-gray-600'}`}>2</div>
                        <span className="font-medium">{t('supervision.steps.step2', '智能抽取')}</span>
                    </div>
                    <div className={`w-12 h-0.5 ${currentStep >= 3 ? 'bg-copper-500' : 'bg-gray-700'}`}></div>
                    <div className={`flex items-center space-x-2 ${currentStep >= 3 ? 'text-copper-400' : 'text-gray-500'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 3 ? 'border-copper-500 bg-copper-500/20' : 'border-gray-600'}`}>3</div>
                        <span className="font-medium">{t('supervision.steps.step3', '结果总览')}</span>
                    </div>
                </div>
            </div>

            {/* Step 1: Upload */}
            {currentStep === 1 && (
                <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto space-y-6 animate-fade-in-up">
                    <div
                        className={`w-full p-12 glass-card border-2 border-dashed rounded-2xl flex flex-col items-center text-center transition-all ${isDragging ? 'border-copper-500 bg-copper-500/10 scale-[1.02]' : 'border-gray-600 hover:border-copper-500/50'}`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-6">
                            <FileUp className={`w-10 h-10 ${isDragging ? 'text-copper-500' : 'text-gray-400'}`} />
                        </div>

                        <h3 className="text-xl font-medium text-white mb-2">
                            {t('supervision.upload.dragDrop', '拖拽合同文件到此处或点击上传')}
                        </h3>
                        <p className="text-gray-400 mb-8">
                            {t('supervision.upload.hint', '支持 PDF 格式的托管合同文件')}
                        </p>

                        <div className="flex space-x-4">
                            <input
                                type="file"
                                id="contract-upload"
                                className="hidden"
                                accept=".pdf"
                                onChange={handleFileInput}
                            />
                            <button
                                onClick={() => document.getElementById('contract-upload').click()}
                                className="px-8 py-3 bg-gradient-to-r from-copper-600 to-copper-500 hover:from-copper-500 hover:to-copper-400 text-white rounded-lg transition-colors flex items-center justify-center font-medium shadow-lg shadow-copper-900/50"
                            >
                                <FileUp className="w-5 h-5 mr-2" />
                                {t('supervision.upload.selectContract', '选择合同文件并解析')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 2: Extraction Animation */}
            {currentStep === 2 && (
                <div className="flex-1 grid grid-cols-12 gap-6 animate-fade-in-up">
                    {/* Status Panel */}
                    <div className="col-span-12 xl:col-span-4 space-y-6">
                        <div className="glass-card p-6 h-full flex flex-col">
                            <div className="flex items-center space-x-4 mb-8 pb-6 border-b border-gray-800">
                                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center text-copper-400">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-white line-clamp-1">{uploadedFile?.name}</h3>
                                    <p className="text-sm text-gray-400">{uploadedFile?.size}</p>
                                </div>
                            </div>

                            <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-6">
                                {t('supervision.extraction.progress', 'Extraction Progress')}
                            </h4>

                            <div className="space-y-6 flex-1">
                                {[0, 1, 2, 3].map((stageIdx) => {
                                    const stageData = supervisionData.extractionStages[stageIdx];
                                    const isActive = extractionStage === stageIdx;
                                    const isPast = extractionStage > stageIdx;

                                    return (
                                        <div key={stageIdx} className={`flex items-start space-x-4 transition-all ${isActive ? 'opacity-100 scale-105' : 'opacity-50'}`}>
                                            <div className="mt-1 relative flex-shrink-0">
                                                {isPast ? (
                                                    <div className="w-6 h-6 rounded-full bg-green-500/20 border border-green-500 flex flex-col items-center justify-center">
                                                        <Check className="w-3.5 h-3.5 text-green-500" />
                                                    </div>
                                                ) : isActive ? (
                                                    <div className="w-6 h-6 rounded-full border-2 border-copper-500 border-t-transparent animate-spin"></div>
                                                ) : (
                                                    <div className="w-6 h-6 rounded-full border-2 border-gray-600 bg-gray-800 flex items-center justify-center">
                                                        <div className="w-2 h-2 rounded-full bg-gray-600"></div>
                                                    </div>
                                                )}
                                                {stageIdx < 3 && (
                                                    <div className={`absolute top-6 left-1/2 -ml-px w-px h-6 ${isPast ? 'bg-green-500/50' : 'bg-gray-700'}`}></div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className={`font-medium ${isActive ? 'text-copper-400' : isPast ? 'text-gray-300' : 'text-gray-500'}`}>
                                                    {stageData ? stageData.label ? stageData.label[lang] : t(`supervision.extraction.${stageData.key}`) : ''}
                                                </p>
                                                {isActive && (
                                                    <div className="mt-2 text-xs text-gray-400 flex items-center">
                                                        <Activity className="w-3.5 h-3.5 mr-1 animate-pulse" />
                                                        AI 引擎分析中...
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Visualization Area */}
                    <div className="col-span-12 xl:col-span-8 grid grid-cols-2 gap-6 h-full min-h-[500px]">
                        {/* Document Outline Preview */}
                        <div className="glass-card flex flex-col h-full border border-gray-800/50 overflow-hidden relative">
                            <div className="p-4 border-b border-gray-800 bg-gray-900/50 font-medium text-gray-300 flex items-center">
                                <Search className="w-4 h-4 mr-2 text-gray-500" />
                                文档原文分析
                            </div>

                            {/* Scanning overlay effect */}
                            {isExtracting && extractionStage < 3 && (
                                <div className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-copper-500/10 to-transparent animate-pulse" style={{ top: '20%', animation: 'slideDown 3s infinite linear' }}></div>
                            )}

                            <div
                                ref={textContainerRef}
                                className="p-6 overflow-y-auto flex-1 font-mono text-xs text-gray-400 leading-relaxed scroll-smooth relative"
                            >
                                {renderContractText(supervisionData.contractText[lang])}
                            </div>
                        </div>

                        {/* Extracted Rules Stream */}
                        <div className="glass-card flex flex-col h-full border border-gray-800/50">
                            <div className="p-4 border-b border-gray-800 bg-gray-900/50 font-medium text-gray-300 flex items-center justify-between">
                                <div className="flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2 text-copper-500" />
                                    规则识别流
                                </div>
                                <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-md">
                                    {visibleRules.length} 规则
                                </span>
                            </div>
                            <div className="flex-1 p-4 overflow-y-auto space-y-3">
                                {visibleRules.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-gray-500">
                                        <Settings className={`w-8 h-8 mb-3 opacity-20 ${extractionStage === 2 ? 'animate-spin' : ''}`} />
                                        <p className="text-sm">等待规则抽取...</p>
                                    </div>
                                )}
                                {visibleRules.map((rule, idx) => (
                                    <div key={rule.id} className="p-3 bg-gray-800/50 border border-gray-700 rounded-lg animate-slide-in-left shadow-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-xs font-mono text-copper-400">{rule.id}</span>
                                            <span className="text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-gray-700 text-gray-300">
                                                {ruleTypeOptions[rule.type]}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-200 mb-2">{rule.content[lang]}</p>
                                        <div className="text-xs text-gray-500 flex items-center">
                                            <FileText className="w-3 h-3 mr-1" />
                                            {rule.clause[lang]}
                                        </div>
                                    </div>
                                ))}
                                {/* Fake scroll anchor */}
                                <div className="h-4"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Step 3: Results */}
            {currentStep === 3 && (
                <div className="flex flex-col space-y-6 animate-fade-in-up h-full">

                    {/* Top Metrics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <MetricCard
                            icon={FileText}
                            title={t('supervision.contract.pageCount', 'Pages')}
                            value={supervisionData.contractMeta.pages}
                            trend="100% 解析"
                            iconColor="text-blue-400"
                        />
                        <MetricCard
                            icon={CheckCircle}
                            title={t('supervision.indicators.autoExtracted', 'Auto-Extracted')}
                            value={supervisionData.stats.autoExtracted}
                            trend="规则"
                            iconColor="text-green-400"
                        />
                        <MetricCard
                            icon={AlertTriangle}
                            title={t('supervision.indicators.manualReview', 'Manual Review')}
                            value={supervisionData.stats.manualReview}
                            trend="待办"
                            iconColor="text-amber-400"
                        />
                        <MetricCard
                            icon={ShieldAlert}
                            title={t('supervision.indicators.title', 'Supervision Indicators')}
                            value={supervisionData.indicators.length}
                            trend="已生成"
                            iconColor="text-copper-400"
                        />
                    </div>

                    {/* Main Content Split */}
                    <div className="flex-1 grid grid-cols-12 gap-6 min-h-0">

                        {/* Left: Contract Summary */}
                        <div className="col-span-12 lg:col-span-3 flex flex-col space-y-4">
                            <div className="glass-card p-5">
                                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                                    <FileText className="w-5 h-5 mr-2 text-copper-400" />
                                    {t('supervision.contract.contractName', 'Contract Name')}
                                </h3>
                                <p className="text-gray-300 font-medium leading-relaxed mb-6">
                                    {supervisionData.contractMeta.name[lang]}
                                </p>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('supervision.contract.manager', 'Asset Manager')}</p>
                                        <p className="text-sm text-gray-300">{supervisionData.contractMeta.parties.manager[lang]}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">{t('supervision.contract.custodian', 'Asset Custodian')}</p>
                                        <p className="text-sm text-gray-300">{supervisionData.contractMeta.parties.custodian[lang]}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">{t('supervision.contract.signDate', 'Sign Date')}</p>
                                            <p className="text-sm text-gray-300">{supervisionData.contractMeta.date}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">{t('supervision.contract.productType', 'Product Type')}</p>
                                            <p className="text-sm text-gray-300">{supervisionData.contractMeta.productType[lang]}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card flex-1 p-5 flex flex-col min-h-[300px]">
                                <h3 className="text-sm font-medium text-white mb-4">{t('supervision.contractPreview', 'Clause Preview')}</h3>
                                <div className="flex-1 overflow-y-auto bg-gray-900/50 p-4 rounded-lg border border-gray-800 text-xs text-gray-400 font-mono whitespace-pre-wrap leading-relaxed shadow-inner">
                                    {supervisionData.contractText[lang]}
                                </div>
                            </div>
                        </div>

                        {/* Right: Rules & Indicators Tabs */}
                        <div className="col-span-12 lg:col-span-9 flex flex-col glass-card">

                            {/* Tabs header */}
                            <div className="flex border-b border-gray-800">
                                <button className="px-6 py-4 text-copper-400 font-medium border-b-2 border-copper-500 bg-gray-800/30 flex items-center">
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    {t('supervision.tabExtraction', 'Rule Extraction')}
                                </button>
                                <button className="px-6 py-4 text-gray-400 font-medium border-b-2 border-transparent hover:text-gray-200 transition-colors flex items-center">
                                    <Activity className="w-4 h-4 mr-2" />
                                    {t('supervision.tabIndicators', 'Indicator Generation')}
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-0">
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead className="bg-gray-800/80 sticky top-0 z-10 backdrop-blur-md">
                                        <tr>
                                            <th className="p-4 font-medium text-gray-400 w-24">{t('supervision.ruleId', 'Rule ID')}</th>
                                            <th className="p-4 font-medium text-gray-400 w-32">{t('supervision.ruleType', 'Type')}</th>
                                            <th className="p-4 font-medium text-gray-400">{t('supervision.ruleContent', 'Content')}</th>
                                            <th className="p-4 font-medium text-gray-400 w-48">{t('supervision.clause', 'Clause')}</th>
                                            <th className="p-4 font-medium text-gray-400 w-24">{t('supervision.regulatoryLevel', 'Level')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800/50">
                                        {supervisionData.extractedRules.map((rule, index) => (
                                            <tr key={index} className="hover:bg-gray-800/30 transition-colors group">
                                                <td className="p-4">
                                                    <span className="font-mono text-copper-400/80 group-hover:text-copper-400">{rule.id}</span>
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-flex items-center px-2 py-1 rounded bg-gray-800/50 text-gray-300 text-xs border border-gray-700/50 group-hover:border-gray-600 transition-colors">
                                                        {ruleTypeOptions[rule.type]}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-gray-300 font-medium whitespace-normal max-w-md">
                                                    {rule.content[lang]}
                                                </td>
                                                <td className="p-4 text-gray-500 truncate">
                                                    {rule.clause[lang]}
                                                </td>
                                                <td className="p-4">
                                                    <StatusBadge
                                                        status={rule.level === 'regulatory' ? 'warning' : 'info'}
                                                        text={rule.level === 'regulatory' ? t('supervision.regulatoryLevel', 'Regulatory') : t('supervision.contractLevel', 'Contract')}
                                                        size="sm"
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Generation action bar */}
                            <div className="p-4 border-t border-gray-800 bg-gray-900/50 flex justify-between items-center rounded-b-2xl">
                                <div className="text-sm text-gray-400 flex items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></div>
                                    规则库已同步
                                </div>
                                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-copper-400 font-medium rounded-lg text-sm transition-colors flex items-center border border-gray-700">
                                    {t('supervision.indicators.batchGenerate', 'Batch Generate Indicators')}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Global generic animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes slideDown {
            0% { transform: translateY(-300%); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(300%); opacity: 0; }
        }
      `}} />
        </div>
    );
};

export default InvestmentSupervision;
