export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "ClauseGuard",
  slug: "clauseguard",
  tagline: "EU AI Act readiness scoring for the AI features you ship.",
  description: "Describe your AI system; get a risk-tier classification and a remediation gap report against EU AI Act obligations. For product and legal leads at SaaS companies launching AI features into the EU.",
  toolTitle: "Score my AI system",
  resultLabel: "Readiness report",
  ctaLabel: "Score",
  features: [
  "Risk-tier scoring",
  "Gap report",
  "Audit log (Team)",
  "EU-focused"
],
  inputs: [
  {
    "key": "system",
    "label": "Describe your AI system",
    "type": "textarea",
    "placeholder": "An LLM chatbot that summarizes user emails and suggests replies, trained on user data."
  },
  {
    "key": "market",
    "label": "Target market",
    "type": "select",
    "options": [
      "EU",
      "Global"
    ]
  }
] as InputField[],
  systemPrompt: "You are an EU AI Act compliance advisor. Given a description of an AI system and its market, classify its risk tier and list the concrete remediation gaps to meet AI Act obligations.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "1 system, basic checklist"
  },
  {
    "tier": "Pro",
    "price": "$49/mo",
    "desc": "Full scoring + gap report"
  },
  {
    "tier": "Team",
    "price": "$99/mo",
    "desc": "Unlimited systems, audit log"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const desc = (inputs['system'] || '').trim()
  const market = inputs['market'] || 'EU'
  if (!desc) return 'Describe your AI system to score it.'
  let out = 'EU AI ACT READINESS\n\n'
  const hasHuman = /human|review|oversight|monitor/i.test(desc)
  const hasData = /data|personal|user|train/i.test(desc)
  const hasRisk = /risk|safety|bias|harm/i.test(desc)
  let tier = 'Low'
  let gaps = []
  if (hasData && !hasHuman) { tier = 'High'; gaps.push('Add human oversight for personal-data processing') }
  else if (hasData) tier = 'Limited'
  if (!hasRisk) gaps.push('Document risk management & bias testing')
  if (market === 'EU') gaps.push('Appoint EU representative / conformity assessment')
  out += 'Risk tier: ' + tier + '\n'
  out += 'Gaps to remediate:\n'
  out += gaps.length ? gaps.map(g => '  - ' + g).join('\n') : '  - None detected (mock)'
  out += '\n\n--- (Mock scoring. Pro gives full AI Act article mapping + audit log.)'
  return out
}
}
