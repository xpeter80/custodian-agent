# Mock data for investment supervision contract extraction
# Based on real PDF: 太平资产乾坤9号资管产品托管合同20160301

CONTRACT_TEXT_ZH = """六、投资政策及变更

(一)投资目标
在具有一定安全边际和保证产品流动性的前提下，追求净值的较快增长。

(二)投资范围
本产品的投资范围为符合法律法规和保监会认可的投资品种（工具），包括但不限于银行存款、股票、债券、证券投资基金、央行票据、短期融资券、资产支持证券、金融衍生产品以及中国保监会认可的其他投资品种等。

(三)投资比例
本产品投资应当符合下列规定：
（1）投资于权益类资产的比例不超过该产品资产总值的80%；
（2）投资于不动产类资产和其他金融资产的比例不超过该产品资产总值的30%；
（3）流动性资产（银行活期存款、货币市场基金和到期日在一年以内的政府债券）配置比例不低于该产品资产总值的5%；
（4）投资于单一固定收益类资产的比例不超过产品资产总值的5%。

(四)投资限制
除法律法规和保监会另有规定外，本产品投资应当符合下列规定：
（1）不得将产品资产投资于所管理的其他产品的资产；
（2）同一资产管理人管理的全部组合投资产品持有一家公司发行的证券，不得超过该证券的10%；
（3）持有一家公司发行的股票的市值不超过该产品资产净值的10%；
（4）持有一家公司发行的债券的市值不超过该产品资产净值的20%；
（5）不得进行融资融券交易；
（6）不得将产品资产投资于关联方的股票或债券；
（7）不得利用产品资产为他人或其他产品提供担保或融资。

七、投资指令的发送、确认和执行

（一）投资指令的处理
资产管理人应按照有关法律法规和本合同的规定，在其合法的经营权限和交易权限内，根据审慎的投资管理原则向资产托管人发送投资指令。

八、产品费用与税收

(一)管理费
资产管理人按前一日委托资产净值1.00%的年费率逐日计提管理费，按月支付。
管理费日计提额 = 前一日资产净值 × 年费率 / 当年天数

(二)托管费
资产托管人按前一日委托资产净值0.20%的年费率逐日计提托管费，按月支付。
托管费日计提额 = 前一日资产净值 × 年费率 / 当年天数

(三)交易费用
本产品证券交易费用按照正常商业条件由各交易对手方收取。"""

CONTRACT_TEXT_EN = """VI. Investment Policy and Changes

(I) Investment Objective
To pursue rapid growth of net value while maintaining a certain margin of safety and ensuring product liquidity.

(II) Investment Scope
The product's investment scope covers instruments recognized by laws, regulations, and CIRC, including but not limited to bank deposits, stocks, bonds, securities investment funds, central bank bills, commercial paper, ABS, financial derivatives, and other CIRC-approved instruments.

(III) Investment Ratios
Product investments shall comply with the following:
(1) Equity asset investment shall not exceed 80% of total product assets;
(2) Real estate and other financial assets shall not exceed 30% of total product assets;
(3) Liquid assets (demand deposits, MMFs, and govt bonds maturing within 1 year) shall not be less than 5% of total product assets;
(4) Single fixed-income instrument shall not exceed 5% of total product assets.

(IV) Investment Restrictions
Unless otherwise provided by laws and CIRC:
(1) Product assets shall not be invested in other products managed by the same manager;
(2) All portfolios under the same manager holding a single company's securities shall not exceed 10% of those securities;
(3) Holding a single company's stock shall not exceed 10% of product NAV;
(4) Holding a single company's bond shall not exceed 20% of product NAV;
(5) Margin trading and securities lending are prohibited;
(6) Product assets shall not be invested in stocks or bonds of related parties;
(7) Product assets shall not be used to provide guarantees or financing for others.

VII. Investment Instructions

(I) Instruction Processing
The asset manager shall send investment instructions to the custodian in accordance with laws and this contract.

VIII. Product Fees and Taxes

(I) Management Fee
Management fee is accrued daily at 1.00% annual rate based on previous day's NAV, paid monthly.
Daily mgmt fee = Previous day NAV × Annual rate / Days in year

(II) Custody Fee
Custody fee is accrued daily at 0.20% annual rate based on previous day's NAV, paid monthly.
Daily custody fee = Previous day NAV × Annual rate / Days in year

(III) Trading Fees
Securities trading fees are charged by counterparties at normal commercial terms."""

EXTRACTED_RULES = [
    {
        "id": "R-001",
        "type": "ratio",
        "content": {
            "zh": "投资于权益类资产的比例不超过该产品资产总值的80%",
            "en": "Equity asset investment shall not exceed 80% of total product assets"
        },
        "clause": {"zh": "第六条第(三)款第(1)项", "en": "Art.6(III)(1)"},
        "level": "regulatory",
        "minValue": None,
        "maxValue": 80,
        "unit": "%"
    },
    {
        "id": "R-002",
        "type": "ratio",
        "content": {
            "zh": "投资于不动产类资产和其他金融资产的比例不超过该产品资产总值的30%",
            "en": "Real estate and other financial assets shall not exceed 30% of total assets"
        },
        "clause": {"zh": "第六条第(三)款第(2)项", "en": "Art.6(III)(2)"},
        "level": "regulatory",
        "minValue": None,
        "maxValue": 30,
        "unit": "%"
    },
    {
        "id": "R-003",
        "type": "liquidity",
        "content": {
            "zh": "流动性资产配置比例不低于该产品资产总值的5%",
            "en": "Liquid assets shall not be less than 5% of total product assets"
        },
        "clause": {"zh": "第六条第(三)款第(3)项", "en": "Art.6(III)(3)"},
        "level": "regulatory",
        "minValue": 5,
        "maxValue": None,
        "unit": "%"
    },
    {
        "id": "R-004",
        "type": "concentration",
        "content": {
            "zh": "投资于单一固定收益类资产的比例不超过产品资产总值的5%",
            "en": "Single fixed-income instrument shall not exceed 5% of total assets"
        },
        "clause": {"zh": "第六条第(三)款第(4)项", "en": "Art.6(III)(4)"},
        "level": "contract",
        "minValue": None,
        "maxValue": 5,
        "unit": "%"
    },
    {
        "id": "R-005",
        "type": "concentration",
        "content": {
            "zh": "同一资产管理人管理的全部组合持有一家公司发行的证券，不得超过该证券的10%",
            "en": "All portfolios under same manager holding a single company securities ≤ 10%"
        },
        "clause": {"zh": "第六条第(四)款第(2)项", "en": "Art.6(IV)(2)"},
        "level": "regulatory",
        "minValue": None,
        "maxValue": 10,
        "unit": "%"
    },
    {
        "id": "R-006",
        "type": "concentration",
        "content": {
            "zh": "持有一家公司发行的股票的市值不超过该产品资产净值的10%",
            "en": "Single company stock holding shall not exceed 10% of product NAV"
        },
        "clause": {"zh": "第六条第(四)款第(3)项", "en": "Art.6(IV)(3)"},
        "level": "regulatory",
        "minValue": None,
        "maxValue": 10,
        "unit": "%"
    },
    {
        "id": "R-007",
        "type": "concentration",
        "content": {
            "zh": "持有一家公司发行的债券的市值不超过该产品资产净值的20%",
            "en": "Single company bond holding shall not exceed 20% of product NAV"
        },
        "clause": {"zh": "第六条第(四)款第(4)项", "en": "Art.6(IV)(4)"},
        "level": "contract",
        "minValue": None,
        "maxValue": 20,
        "unit": "%"
    },
    {
        "id": "R-008",
        "type": "prohibited",
        "content": {
            "zh": "不得进行融资融券交易",
            "en": "Margin trading and securities lending are prohibited"
        },
        "clause": {"zh": "第六条第(四)款第(5)项", "en": "Art.6(IV)(5)"},
        "level": "regulatory",
        "minValue": None,
        "maxValue": None,
        "unit": None
    },
    {
        "id": "R-009",
        "type": "prohibited",
        "content": {
            "zh": "不得将产品资产投资于关联方的股票或债券",
            "en": "Product assets shall not be invested in related party stocks or bonds"
        },
        "clause": {"zh": "第六条第(四)款第(6)项", "en": "Art.6(IV)(6)"},
        "level": "regulatory",
        "minValue": None,
        "maxValue": None,
        "unit": None
    },
    {
        "id": "R-010",
        "type": "prohibited",
        "content": {
            "zh": "不得利用产品资产为他人或其他产品提供担保或融资",
            "en": "Product assets shall not be used to provide guarantees or financing for others"
        },
        "clause": {"zh": "第六条第(四)款第(7)项", "en": "Art.6(IV)(7)"},
        "level": "contract",
        "minValue": None,
        "maxValue": None,
        "unit": None
    },
    {
        "id": "R-011",
        "type": "ratio",
        "content": {
            "zh": "管理费按前一日委托资产净值1.00%的年费率逐日计提",
            "en": "Management fee accrued daily at 1.00% annual rate based on previous day NAV"
        },
        "clause": {"zh": "第八条第(一)款", "en": "Art.8(I)"},
        "level": "contract",
        "minValue": None,
        "maxValue": 1.0,
        "unit": "% p.a."
    },
    {
        "id": "R-012",
        "type": "ratio",
        "content": {
            "zh": "托管费按前一日委托资产净值0.20%的年费率逐日计提",
            "en": "Custody fee accrued daily at 0.20% annual rate based on previous day NAV"
        },
        "clause": {"zh": "第八条第(二)款", "en": "Art.8(II)"},
        "level": "contract",
        "minValue": None,
        "maxValue": 0.2,
        "unit": "% p.a."
    },
]

INDICATORS = [
    {"name": {"zh": "权益类资产比例", "en": "Equity Asset Ratio"}, "threshold": "≤80%", "currentValue": 62.5, "status": "compliant", "ruleId": "R-001"},
    {"name": {"zh": "不动产及其他金融资产比例", "en": "Real Estate & Other Financial Ratio"}, "threshold": "≤30%", "currentValue": 8.3, "status": "compliant", "ruleId": "R-002"},
    {"name": {"zh": "流动性资产比例", "en": "Liquid Asset Ratio"}, "threshold": "≥5%", "currentValue": 5.2, "status": "nearLimit", "ruleId": "R-003"},
    {"name": {"zh": "单一固收持仓集中度", "en": "Single Fixed-Income Concentration"}, "threshold": "≤5%", "currentValue": 4.1, "status": "compliant", "ruleId": "R-004"},
    {"name": {"zh": "全部组合持单一公司证券比例", "en": "All Portfolios Single Company Ratio"}, "threshold": "≤10%", "currentValue": 11.2, "status": "breached", "ruleId": "R-005"},
    {"name": {"zh": "单一公司股票持仓集中度", "en": "Single Company Stock Concentration"}, "threshold": "≤10%", "currentValue": 8.7, "status": "compliant", "ruleId": "R-006"},
    {"name": {"zh": "单一公司债券持仓集中度", "en": "Single Company Bond Concentration"}, "threshold": "≤20%", "currentValue": 18.5, "status": "nearLimit", "ruleId": "R-007"},
    {"name": {"zh": "管理费率", "en": "Management Fee Rate"}, "threshold": "1.00% p.a.", "currentValue": 1.0, "status": "compliant", "ruleId": "R-011"},
    {"name": {"zh": "托管费率", "en": "Custody Fee Rate"}, "threshold": "0.20% p.a.", "currentValue": 0.2, "status": "compliant", "ruleId": "R-012"},
]

CONTRACT_META = {
    "name": {"zh": "太平资产乾坤9号资管产品托管合同", "en": "Taiping Asset Qiankun No.9 Custody Contract"},
    "date": "2016-03-01",
    "parties": {
        "manager": {"zh": "太平资产管理有限公司", "en": "Taiping Asset Management Co., Ltd."},
        "custodian": {"zh": "中国建设银行股份有限公司", "en": "China Construction Bank Corporation"}
    },
    "pages": 39,
    "productType": {"zh": "资管产品", "en": "Asset Management Product"}
}

EXTRACTION_STAGES = [
    {"key": "parsing", "label": {"zh": "解析 PDF 文档结构", "en": "Parsing PDF document structure"}, "duration": 1200},
    {"key": "recognizing", "label": {"zh": "识别合同条款章节", "en": "Recognizing contract clauses"}, "duration": 1500},
    {"key": "extracting", "label": {"zh": "智能抽取投资监督规则", "en": "AI extracting supervision rules"}, "duration": 2000},
    {"key": "generating", "label": {"zh": "生成合规监控指标", "en": "Generating compliance indicators"}, "duration": 1000},
]
