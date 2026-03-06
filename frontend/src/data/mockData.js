// Mock data for the Asset Custody Intelligent Agent System

// ===== Instruction Templates =====
export const instructionTemplates = {
    ipo_subscription: {
        name: { zh: '网下IPO申购划款', en: 'Offline IPO Subscription Payment' },
        fields: [
            { key: 'fundName', label: { zh: '基金名称', en: 'Fund Name' }, type: 'text' },
            { key: 'instructionNo', label: { zh: '指令编号', en: 'Instruction No.' }, type: 'text' },
            { key: 'subscriptionPrice', label: { zh: '申购价格', en: 'Subscription Price' }, type: 'currency' },
            { key: 'subscriptionQty', label: { zh: '申购数量', en: 'Subscription Qty' }, type: 'number' },
            { key: 'amount', label: { zh: '划款金额', en: 'Transfer Amount' }, type: 'currency' },
            { key: 'amountCN', label: { zh: '大写金额', en: 'Amount (Words)' }, type: 'text' },
            { key: 'payee', label: { zh: '收款单位', en: 'Payee' }, type: 'text' },
            { key: 'payeeBank', label: { zh: '开户银行', en: 'Payee Bank' }, type: 'text' },
            { key: 'account', label: { zh: '账号', en: 'Account No.' }, type: 'text' },
            { key: 'purpose', label: { zh: '划款用途', en: 'Transfer Purpose' }, type: 'text' },
            { key: 'deadline', label: { zh: '最迟到账时间', en: 'Latest Arrival Time' }, type: 'date' },
        ]
    },
    custody_fee: {
        name: { zh: '托管费划款', en: 'Custody Fee Payment' },
        fields: [
            { key: 'fundName', label: { zh: '基金名称', en: 'Fund Name' }, type: 'text' },
            { key: 'instructionNo', label: { zh: '指令编号', en: 'Instruction No.' }, type: 'text' },
            { key: 'amount', label: { zh: '划款金额', en: 'Transfer Amount' }, type: 'currency' },
            { key: 'amountCN', label: { zh: '大写金额', en: 'Amount (Words)' }, type: 'text' },
            { key: 'feeType', label: { zh: '费用类型', en: 'Fee Type' }, type: 'text' },
            { key: 'feePeriod', label: { zh: '计费期间', en: 'Billing Period' }, type: 'text' },
            { key: 'payee', label: { zh: '收款单位', en: 'Payee' }, type: 'text' },
            { key: 'payeeBank', label: { zh: '开户银行', en: 'Payee Bank' }, type: 'text' },
            { key: 'account', label: { zh: '账号', en: 'Account No.' }, type: 'text' },
            { key: 'deadline', label: { zh: '最迟到账时间', en: 'Latest Arrival Time' }, type: 'date' },
        ]
    },
    interbank_settlement: {
        name: { zh: '银行间成交单', en: 'Interbank Settlement' },
        fields: [
            { key: 'direction', label: { zh: '交易方向', en: 'Trade Direction' }, type: 'text' },
            { key: 'product', label: { zh: '交易品种', en: 'Product' }, type: 'text' },
            { key: 'amount', label: { zh: '成交金额', en: 'Settlement Amount' }, type: 'currency' },
            { key: 'price', label: { zh: '成交价格', en: 'Settlement Price' }, type: 'currency' },
            { key: 'quantity', label: { zh: '成交数量', en: 'Quantity' }, type: 'number' },
            { key: 'settlementDate', label: { zh: '结算日期', en: 'Settlement Date' }, type: 'date' },
            { key: 'counterparty', label: { zh: '对手方', en: 'Counterparty' }, type: 'text' },
            { key: 'deliveryMethod', label: { zh: '交割方式', en: 'Delivery Method' }, type: 'text' },
        ]
    },
    redemption: {
        name: { zh: '赎回划款', en: 'Redemption Payment' },
        fields: [
            { key: 'fundName', label: { zh: '基金名称', en: 'Fund Name' }, type: 'text' },
            { key: 'instructionNo', label: { zh: '指令编号', en: 'Instruction No.' }, type: 'text' },
            { key: 'amount', label: { zh: '划款金额', en: 'Transfer Amount' }, type: 'currency' },
            { key: 'amountCN', label: { zh: '大写金额', en: 'Amount (Words)' }, type: 'text' },
            { key: 'payee', label: { zh: '收款单位', en: 'Payee' }, type: 'text' },
            { key: 'payeeBank', label: { zh: '开户银行', en: 'Payee Bank' }, type: 'text' },
            { key: 'account', label: { zh: '账号', en: 'Account No.' }, type: 'text' },
            { key: 'purpose', label: { zh: '划款用途', en: 'Transfer Purpose' }, type: 'text' },
            { key: 'deadline', label: { zh: '最迟到账时间', en: 'Latest Arrival Time' }, type: 'date' },
        ]
    },
    dividend: {
        name: { zh: '分红划款', en: 'Dividend Payment' },
        fields: [
            { key: 'fundName', label: { zh: '基金名称', en: 'Fund Name' }, type: 'text' },
            { key: 'instructionNo', label: { zh: '指令编号', en: 'Instruction No.' }, type: 'text' },
            { key: 'amount', label: { zh: '分红金额', en: 'Dividend Amount' }, type: 'currency' },
            { key: 'amountCN', label: { zh: '大写金额', en: 'Amount (Words)' }, type: 'text' },
            { key: 'dividendDate', label: { zh: '分红日期', en: 'Dividend Date' }, type: 'date' },
            { key: 'payee', label: { zh: '收款单位', en: 'Payee' }, type: 'text' },
            { key: 'account', label: { zh: '账号', en: 'Account No.' }, type: 'text' },
            { key: 'deadline', label: { zh: '最迟到账时间', en: 'Latest Arrival Time' }, type: 'date' },
        ]
    },
}

// ===== Module 1: Clearing Instructions =====
export const sampleInstructions = [
    {
        id: 'INS-2024-001',
        filename: '2-网下IPO资料-申购划款指令.jpg',
        businessType: 'ipo_subscription',
        businessTypeName: { zh: '网下IPO申购划款', en: 'Offline IPO Subscription' },
        confidence: 96.8,
        status: 'completed',
        recognizedFields: {
            fundName: { zh: '博时策略混合', en: 'Bosera Strategy Mixed' },
            instructionNo: '2011年88号',
            subscriptionPrice: '28.00',
            subscriptionQty: '5,000,000',
            amount: '140,000,000.00',
            amountCN: { zh: '壹亿肆仟万元整', en: 'One Hundred Forty Million Yuan' },
            payee: { zh: '中国证券登记结算有限责任公司上海分公司（网下发行专户）', en: 'CSDC Shanghai Branch (Offline IPO Account)' },
            payeeBank: { zh: '中国建设银行股份有限公司上海市分行营业部', en: 'CCB Shanghai Branch Business Dept' },
            account: '31001550400050015290',
            purpose: 'D890775821601336',
            deadline: '2011-12-07',
        }
    },
    {
        id: 'INS-2024-002',
        filename: '汇丰晋信托管费划款指令.tif',
        businessType: 'custody_fee',
        businessTypeName: { zh: '托管费划款', en: 'Custody Fee Payment' },
        confidence: 94.2,
        status: 'completed',
        recognizedFields: {
            fundName: { zh: '汇丰晋信动态策略混合', en: 'HSBC Jintrust Dynamic Strategy Mixed' },
            instructionNo: '2024年045号',
            amount: '356,800.00',
            amountCN: { zh: '叁拾伍万陆仟捌佰元整', en: 'Three Hundred Fifty-Six Thousand Eight Hundred Yuan' },
            feeType: { zh: '托管费', en: 'Custody Fee' },
            feePeriod: '2024-01 ~ 2024-03',
            payee: { zh: '汇丰晋信基金管理有限公司', en: 'HSBC Jintrust Fund Management Co.' },
            payeeBank: { zh: '汇丰银行（中国）有限公司上海分行', en: 'HSBC Bank (China) Shanghai Branch' },
            account: '621088010000287956',
            deadline: '2024-03-31',
        }
    },
    {
        id: 'INS-2024-003',
        filename: '泰康网下IPO划款指令601336.jpg',
        businessType: 'ipo_subscription',
        businessTypeName: { zh: '网下IPO申购划款', en: 'Offline IPO Subscription' },
        confidence: 97.5,
        status: 'completed',
        recognizedFields: {
            fundName: { zh: '泰康策略优选混合', en: 'Taikang Strategy Select Mixed' },
            instructionNo: '2024年112号',
            subscriptionPrice: '15.80',
            subscriptionQty: '8,000,000',
            amount: '126,400,000.00',
            amountCN: { zh: '壹亿贰仟陆佰肆拾万元整', en: 'One Hundred Twenty-Six Million Four Hundred Thousand Yuan' },
            payee: { zh: '中国证券登记结算有限责任公司上海分公司（网下发行专户）', en: 'CSDC Shanghai Branch (Offline IPO Account)' },
            payeeBank: { zh: '中国建设银行股份有限公司上海市分行营业部', en: 'CCB Shanghai Branch Business Dept' },
            account: '31001550400050015290',
            purpose: 'D890775821601336',
            deadline: '2024-03-18',
        }
    },
    {
        id: 'INS-2024-004',
        filename: '银行间成交单2.tif',
        businessType: 'interbank_settlement',
        businessTypeName: { zh: '银行间成交单', en: 'Interbank Settlement' },
        confidence: 92.1,
        status: 'completed',
        recognizedFields: {
            direction: { zh: '买入', en: 'Buy' },
            product: { zh: '24国开05', en: '24 CDB 05' },
            amount: '50,230,000.00',
            price: '100.46',
            quantity: '500,000',
            settlementDate: '2024-03-15',
            counterparty: { zh: '中国工商银行股份有限公司', en: 'ICBC Co., Ltd.' },
            deliveryMethod: { zh: '券款对付(DVP)', en: 'Delivery vs Payment (DVP)' },
        }
    },
    {
        id: 'INS-2024-005',
        filename: '银行间成交单3.tif',
        businessType: 'interbank_settlement',
        businessTypeName: { zh: '银行间成交单', en: 'Interbank Settlement' },
        confidence: 93.8,
        status: 'completed',
        recognizedFields: {
            direction: { zh: '卖出', en: 'Sell' },
            product: { zh: '23进出02', en: '23 EXIM 02' },
            amount: '30,150,000.00',
            price: '99.85',
            quantity: '302,000',
            settlementDate: '2024-03-16',
            counterparty: { zh: '中国农业银行股份有限公司', en: 'ABC Co., Ltd.' },
            deliveryMethod: { zh: '券款对付(DVP)', en: 'Delivery vs Payment (DVP)' },
        }
    },
];


// Monitor data for peak payment monitoring
export const monitorData = {
    metrics: {
        volume: 1847,
        latency: 2.3,
        successRate: 99.2,
        queueDepth: 23
    },
    throughputTrend: [
        { time: '08:00', value: 45 },
        { time: '09:00', value: 120 },
        { time: '10:00', value: 280 },
        { time: '10:30', value: 420 },
        { time: '11:00', value: 380 },
        { time: '11:30', value: 310 },
        { time: '12:00', value: 150 },
        { time: '13:00', value: 95 },
        { time: '13:30', value: 180 },
        { time: '14:00', value: 350 },
        { time: '14:30', value: 480 },
        { time: '15:00', value: 520 },
        { time: '15:30', value: 390 },
        { time: '16:00', value: 220 },
        { time: '16:30', value: 110 },
        { time: '17:00', value: 45 }
    ],
    alerts: [
        { id: 1, type: 'warning', message: { zh: '14:30 处理量达到峰值 (480笔/小时)，接近系统容量上限', en: 'Peak volume at 14:30 (480 txn/hr), approaching system capacity' }, time: '14:30' },
        { id: 2, type: 'info', message: { zh: '清算通道 A 队列深度正常，平均延迟 1.8 秒', en: 'Channel A queue depth normal, avg latency 1.8s' }, time: '14:15' },
        { id: 3, type: 'error', message: { zh: '15:00 检测到短时间处理拥堵，已自动扩展处理通道', en: 'Congestion detected at 15:00, auto-scaling activated' }, time: '15:00' },
        { id: 4, type: 'success', message: { zh: '拥堵已缓解，系统恢复正常运行', en: 'Congestion resolved, system back to normal' }, time: '15:12' }
    ]
};

// ===== Module 2: Position Estimation =====
export const positionData = {
    overview: {
        receivable: 89500,
        payable: 67200,
        netPosition: 22300
    },
    trend: [
        { date: '03-08', actual: 18500, predicted: 18200, upper: 25000, lower: 10000 },
        { date: '03-09', actual: 21000, predicted: 20800, upper: 25000, lower: 10000 },
        { date: '03-10', actual: 19800, predicted: 20100, upper: 25000, lower: 10000 },
        { date: '03-11', actual: 23500, predicted: 22900, upper: 25000, lower: 10000 },
        { date: '03-12', actual: 25200, predicted: 24100, upper: 25000, lower: 10000 },
        { date: '03-13', actual: 22800, predicted: 23000, upper: 25000, lower: 10000 },
        { date: '03-14', actual: 21500, predicted: 21800, upper: 25000, lower: 10000 },
        { date: '03-15', actual: 22300, predicted: 22100, upper: 25000, lower: 10000 },
        { date: '03-16', actual: null, predicted: 23500, upper: 25000, lower: 10000 },
        { date: '03-17', actual: null, predicted: 24800, upper: 25000, lower: 10000 },
        { date: '03-18', actual: null, predicted: 22000, upper: 25000, lower: 10000 }
    ],
    fundDetails: [
        { code: '050001', name: { zh: '博时价值增长', en: 'Bosera Value Growth' }, position: 5280, predicted: 5350, deviation: 1.3, status: 'safe' },
        { code: '050002', name: { zh: '博时策略混合', en: 'Bosera Strategy Mixed' }, position: 8900, predicted: 8750, deviation: -1.7, status: 'safe' },
        { code: '000001', name: { zh: '华夏回报混合A', en: 'ChinaAMC Return Mixed A' }, position: 3200, predicted: 3450, deviation: 7.8, status: 'warning' },
        { code: '110011', name: { zh: '易方达蓝筹精选', en: 'E Fund Blue Chip Select' }, position: 12500, predicted: 12000, deviation: -4.0, status: 'caution' },
        { code: '519002', name: { zh: '华安策略优选', en: 'HuaAn Strategy Select' }, position: 4100, predicted: 4200, deviation: 2.4, status: 'safe' },
        { code: '162201', name: { zh: '泰达宏利成长', en: 'Teda Growth' }, position: 2800, predicted: 4500, deviation: 60.7, status: 'danger' }
    ]
};

// ===== Module 3: Reconciliation =====
export const reconciliationData = {
    errors: [
        {
            id: 'ERR-001',
            type: 'price',
            fundName: { zh: '博时策略混合', en: 'Bosera Strategy Mixed' },
            amount: 15234.50,
            date: '2024-03-15',
            rootCause: { zh: '托管方使用收盘价 28.55，管理人使用结算价 28.48，价差 0.07 元', en: 'Custodian used closing price 28.55, manager used settlement price 28.48, diff 0.07' },
            resolution: { zh: '建议统一使用中证指数公司发布的收盘价作为估值依据', en: 'Recommend using CSI published closing price as valuation basis' },
            custodianParam: '28.55',
            managerParam: '28.48',
            paramDiff: '0.07'
        },
        {
            id: 'ERR-002',
            type: 'fee',
            fundName: { zh: '华夏回报混合A', en: 'ChinaAMC Return Mixed A' },
            amount: 8920.00,
            date: '2024-03-15',
            rootCause: { zh: '管理费计提基数差异：托管方按前一日资产净值计提，管理人按当日资产净值计提', en: 'Management fee base diff: custodian uses prev-day NAV, manager uses current-day NAV' },
            resolution: { zh: '核实合同约定的管理费计提基数，统一计算口径', en: 'Verify contractual management fee base, unify calculation methodology' },
            custodianParam: '1,250,000,000',
            managerParam: '1,252,300,000',
            paramDiff: '2,300,000'
        },
        {
            id: 'ERR-003',
            type: 'interest',
            fundName: { zh: '易方达蓝筹精选', en: 'E Fund Blue Chip Select' },
            amount: 3456.78,
            date: '2024-03-14',
            rootCause: { zh: '债券应计利息天数差异：托管方按实际天数/365计算，管理人按实际天数/360计算', en: 'Accrued interest day count diff: custodian ACT/365 vs manager ACT/360' },
            resolution: { zh: '根据债券发行条款确认计息规则，该债券应采用ACT/365计息方式', en: 'Confirm interest accrual rule per bond terms, should use ACT/365' },
            custodianParam: 'ACT/365',
            managerParam: 'ACT/360',
            paramDiff: '5 days basis'
        },
        {
            id: 'ERR-004',
            type: 'quantity',
            fundName: { zh: '华安策略优选', en: 'HuaAn Strategy Select' },
            amount: 125000.00,
            date: '2024-03-15',
            rootCause: { zh: '交易确认延迟导致持仓数量不一致，T日交易未及时入账', en: 'Trade confirmation delay caused position mismatch, T-day trade not posted' },
            resolution: { zh: '等待T+1日交易确认后核对，如仍有差异需联系交易所核实', en: 'Verify after T+1 trade confirmation, contact exchange if diff persists' },
            custodianParam: '5,000,000',
            managerParam: '5,050,000',
            paramDiff: '50,000'
        }
    ],
    accountMapping: [
        { managerCode: '1102.01', managerName: { zh: '股票投资-A股', en: 'Stock Investment - A Share' }, custodianCode: '1102.01.01', custodianName: { zh: '股票投资-沪市A股', en: 'Stock - SSE A Share' }, status: 'matched', confidence: 98.5 },
        { managerCode: '1102.02', managerName: { zh: '股票投资-创业板', en: 'Stock - ChiNext' }, custodianCode: '1102.01.03', custodianName: { zh: '股票投资-创业板', en: 'Stock - ChiNext' }, status: 'matched', confidence: 99.1 },
        { managerCode: '1103.01', managerName: { zh: '债券投资-国债', en: 'Bond - Treasury' }, custodianCode: '1103.01.01', custodianName: { zh: '债券投资-记账式国债', en: 'Bond - Book-entry Treasury' }, status: 'suggested', confidence: 87.3, diffReason: { zh: '管理人科目未区分记账式与储蓄式国债', en: 'Manager account does not distinguish book-entry vs savings treasury' }, suggestion: { zh: '建议将管理人科目拆分为记账式国债和储蓄式国债两个子科目', en: 'Suggest splitting into book-entry and savings treasury sub-accounts' } },
        { managerCode: '1103.05', managerName: { zh: '债券投资-可转债', en: 'Bond - Convertible' }, custodianCode: '1103.03.01', custodianName: { zh: '可转换债券投资', en: 'Convertible Bond Investment' }, status: 'suggested', confidence: 82.1, diffReason: { zh: '编码体系不同：管理人在1103下编码，托管方在独立科目编码', en: 'Different coding: manager under 1103, custodian uses separate account code' }, suggestion: { zh: '对照管理人与托管方科目编码表，建立代码映射关系', en: 'Map manager and custodian account codes through code comparison table' } },
        { managerCode: '2201.01', managerName: { zh: '应付管理费', en: 'Mgmt Fee Payable' }, custodianCode: '2201.01', custodianName: { zh: '应付基金管理费', en: 'Fund Mgmt Fee Payable' }, status: 'matched', confidence: 96.8 },
        { managerCode: '3003.01', managerName: { zh: '期货浮动盈亏', en: 'Futures Unrealized P&L' }, custodianCode: null, custodianName: null, status: 'unmatched', confidence: 0, diffReason: { zh: '托管方科目体系中无对应期货浮动盈亏独立科目', en: 'Custodian system lacks corresponding futures unrealized P&L account' }, suggestion: { zh: '建议在托管方科目体系中新增期货浮动盈亏科目(建议编码: 3003.01)', en: 'Recommend adding futures unrealized P&L account (suggested code: 3003.01)' } }
    ],
    mappingStats: {
        total: 156,
        matched: 128,
        pending: 22,
        unmatched: 6,
        successRate: 82.1
    }
};

// ===== Module 4: Investment Supervision =====
export const supervisionData = {
    contractText: {
        zh: `第二十一条 投资范围
本基金的投资范围为具有良好流动性的金融工具，包括国内依法发行上市的股票（含中小板、创业板及其他经中国证监会核准上市的股票）、债券（包括国债、央行票据、金融债券、企业债券、公司债券、中期票据、短期融资券、超短期融资券、次级债券、政府支持机构债、政府支持债券、地方政府债、可转换债券、可交换债券及其他中国证监会允许基金投资的债券）、资产支持证券、债券回购、银行存款、同业存单、货币市场工具、权证及法律法规或中国证监会允许基金投资的其他金融工具。

第二十二条 投资比例限制
（1）本基金股票投资占基金资产的比例范围为60%-95%；
（2）本基金每个交易日日终在扣除股指期货合约需缴纳的交易保证金后，持有的现金或到期日在一年以内的政府债券的比例合计不低于基金资产净值的5%；
（3）本基金持有一家公司发行的证券，其市值不超过基金资产净值的10%；
（4）本基金管理人管理的全部基金持有一家公司发行的证券，不超过该证券的10%；
（5）本基金持有的全部权证，其市值不得超过基金资产净值的3%；
（6）本基金在任何交易日买入权证的总金额，不得超过上一交易日基金资产净值的0.5%。`,
        en: `Article 21 - Investment Scope
The fund's investment scope covers financial instruments with good liquidity, including domestically listed stocks (including SME board, ChiNext board and other CSRC-approved stocks), bonds (including treasury bonds, central bank bills, financial bonds, corporate bonds, medium-term notes, commercial paper, subordinated bonds, local government bonds, convertible bonds, exchangeable bonds and other CSRC-approved bonds), ABS, repo, bank deposits, NCDs, money market instruments, warrants and other eligible instruments.

Article 22 - Investment Ratio Limits
(1) Stock investments shall range from 60% to 95% of fund assets;
(2) Cash or government bonds maturing within one year shall not be less than 5% of NAV after deducting futures margin;
(3) Securities of a single company shall not exceed 10% of NAV;
(4) All funds under this manager holding a single company's securities shall not exceed 10% of those securities;
(5) Total warrants shall not exceed 3% of NAV;
(6) Daily warrant purchases shall not exceed 0.5% of previous day's NAV.`
    },
    extractedRules: [
        { id: 'R-001', type: 'ratio', content: { zh: '股票投资占基金资产的比例范围为60%-95%', en: 'Stock investment ratio: 60%-95% of fund assets' }, clause: { zh: '第二十二条第(1)款', en: 'Art. 22(1)' }, level: 'contract', minValue: 60, maxValue: 95, unit: '%' },
        { id: 'R-002', type: 'liquidity', content: { zh: '现金或一年内政府债券不低于基金资产净值的5%', en: 'Cash or govt bonds ≤1yr maturity ≥ 5% NAV' }, clause: { zh: '第二十二条第(2)款', en: 'Art. 22(2)' }, level: 'regulatory', minValue: 5, maxValue: null, unit: '%' },
        { id: 'R-003', type: 'concentration', content: { zh: '持有一家公司证券市值不超过基金资产净值的10%', en: 'Single company holdings ≤ 10% NAV' }, clause: { zh: '第二十二条第(3)款', en: 'Art. 22(3)' }, level: 'regulatory', minValue: null, maxValue: 10, unit: '%' },
        { id: 'R-004', type: 'concentration', content: { zh: '全部基金持有一家公司证券不超过该证券的10%', en: 'All funds holding single company securities ≤ 10%' }, clause: { zh: '第二十二条第(4)款', en: 'Art. 22(4)' }, level: 'regulatory', minValue: null, maxValue: 10, unit: '%' },
        { id: 'R-005', type: 'ratio', content: { zh: '全部权证市值不超过基金资产净值的3%', en: 'Total warrants ≤ 3% NAV' }, clause: { zh: '第二十二条第(5)款', en: 'Art. 22(5)' }, level: 'contract', minValue: null, maxValue: 3, unit: '%' },
        { id: 'R-006', type: 'ratio', content: { zh: '买入权证总金额不超过上一交易日基金资产净值的0.5%', en: 'Daily warrant purchases ≤ 0.5% prev-day NAV' }, clause: { zh: '第二十二条第(6)款', en: 'Art. 22(6)' }, level: 'contract', minValue: null, maxValue: 0.5, unit: '%' }
    ],
    indicators: [
        { name: { zh: '股票仓位比例', en: 'Stock Position Ratio' }, threshold: '60%-95%', currentValue: 82.3, status: 'compliant' },
        { name: { zh: '现金及短期国债比例', en: 'Cash & Short-term Govt Bond Ratio' }, threshold: '≥5%', currentValue: 6.8, status: 'compliant' },
        { name: { zh: '单一公司持仓集中度', en: 'Single Company Concentration' }, threshold: '≤10%', currentValue: 9.2, status: 'nearLimit' },
        { name: { zh: '权证市值占比', en: 'Warrant Value Ratio' }, threshold: '≤3%', currentValue: 0.8, status: 'compliant' },
        { name: { zh: '权证日买入限额', en: 'Daily Warrant Purchase Limit' }, threshold: '≤0.5%', currentValue: 0.15, status: 'compliant' },
        { name: { zh: '全部基金持单一公司比例', en: 'All Funds Single Company Ratio' }, threshold: '≤10%', currentValue: 11.2, status: 'breached' }
    ],
    stats: {
        totalRules: 42,
        autoExtracted: 36,
        manualReview: 6
    }
};

// ===== Dashboard Data =====
export const dashboardData = {
    metrics: {
        totalInstructions: 1847,
        processedInstructions: 1823,
        pendingInstructions: 24,
        alertCount: 3,
        processingRate: 99.2,
        avgLatency: 2.3,
        netPosition: 22300,
        reconciliationRate: 96.8
    },
    recentActivity: [
        { id: 1, type: 'instruction', message: { zh: '博时策略混合 申购指令已完成处理', en: 'Bosera Strategy Mixed subscription completed' }, time: '2分钟前', timeEn: '2 min ago', icon: 'check' },
        { id: 2, type: 'warning', message: { zh: '头寸预警：泰达宏利成长基金偏差超过阈值', en: 'Position alert: Teda Growth fund deviation exceeds threshold' }, time: '15分钟前', timeEn: '15 min ago', icon: 'alert' },
        { id: 3, type: 'reconciliation', message: { zh: '核算对账：发现3笔新的差错记录', en: 'Reconciliation: 3 new error records found' }, time: '28分钟前', timeEn: '28 min ago', icon: 'search' },
        { id: 4, type: 'supervision', message: { zh: '投资监督：全部基金持单一公司比例超限预警', en: 'Supervision: All funds single company ratio breach warning' }, time: '45分钟前', timeEn: '45 min ago', icon: 'shield' },
        { id: 5, type: 'instruction', message: { zh: '华夏回报混合A 分红指令已分拣至分红流程', en: 'ChinaAMC Return Mixed A dividend sorted to dividend pipeline' }, time: '1小时前', timeEn: '1 hr ago', icon: 'sort' },
        { id: 6, type: 'system', message: { zh: '系统已自动扩展清算通道应对高峰期', en: 'System auto-scaled clearing channels for peak period' }, time: '1小时前', timeEn: '1 hr ago', icon: 'server' }
    ]
};
