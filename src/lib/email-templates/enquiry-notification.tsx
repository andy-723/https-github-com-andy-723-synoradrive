import * as React from 'react'
import { Body, Container, Head, Heading, Hr, Html, Preview, Section, Text } from '@react-email/components'
import type { TemplateEntry } from './registry'

interface Props {
  kind?: string
  fields?: { label: string; value: string }[]
}

const EnquiryNotification = ({ kind = 'New enquiry', fields = [] }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>{`${kind} from the SynoraDrive website`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={brand}>Synora<span style={{ color: '#6366F1' }}>Drive</span></Text>
        <Heading style={h1}>{kind}</Heading>
        <Text style={muted}>A new submission came in from the website. Reply to this email to respond directly.</Text>
        <Hr style={hr} />
        {fields.map((f) => (
          <Section key={f.label} style={{ marginBottom: '12px' }}>
            <Text style={label}>{f.label}</Text>
            <Text style={value}>{f.value}</Text>
          </Section>
        ))}
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: EnquiryNotification,
  subject: (d: Record<string, any>) => `${d.kind ?? 'New enquiry'} — SynoraDrive website`,
  displayName: 'Website enquiry (to owner)',
  to: 'andrew@synoratech.ai',
  previewData: {
    kind: 'Demo request',
    fields: [
      { label: 'Name', value: 'Jane Example' },
      { label: 'Work email', value: 'jane@example.com' },
      { label: 'Dealership', value: 'Example Motors' },
    ],
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Manrope, Arial, sans-serif' }
const container = { padding: '28px 28px', maxWidth: '560px' }
const brand = { fontSize: '18px', fontWeight: 700, color: '#05050A', margin: '0 0 16px' }
const h1 = { fontSize: '22px', fontWeight: 700, color: '#05050A', margin: '0 0 8px' }
const muted = { fontSize: '14px', color: '#55575f', margin: '0 0 16px' }
const hr = { borderColor: '#e5e7eb', margin: '16px 0' }
const label = { fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#6366F1', margin: '0' }
const value = { fontSize: '14px', color: '#05050A', margin: '2px 0 0', whiteSpace: 'pre-wrap' as const }
