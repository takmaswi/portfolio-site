"""Generate the public, privacy-safe CV. Source: ../taku.md.

Employment dates and present-day Fairvalue title need confirmation and are
intentionally omitted. No residential address, birth date or identity numbers.
"""
from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.enums import TA_LEFT

target = Path(__file__).resolve().parents[1] / 'public' / 'Takunda-Maswi-CV.pdf'
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='NameCV', fontName='Helvetica-Bold', fontSize=27, leading=32, textColor=colors.HexColor('#17191B')))
styles.add(ParagraphStyle(name='SectionCV', fontName='Helvetica-Bold', fontSize=11, leading=16, spaceBefore=16, spaceAfter=6, textColor=colors.HexColor('#721D32')))
styles.add(ParagraphStyle(name='BodyCV', fontName='Helvetica', fontSize=10, leading=15, spaceAfter=7, alignment=TA_LEFT))
story = []
def p(text, style='BodyCV'):
    story.append(Paragraph(text, styles[style]))
p('Takunda Christopher Maswi', 'NameCV')
p('Full-stack developer | AI systems builder | Systems consultant')
p('<link href="mailto:takmaswi@gmail.com">takmaswi@gmail.com</link> | Harare, Zimbabwe | UTC+2 | Open to international opportunities')
p('<link href="https://github.com/takmaswi">github.com/takmaswi</link> | <link href="https://linkedin.com/in/takunda-christopher-maswi-97672045">LinkedIn: Takunda Christopher Maswi</link>')
p('PROFILE', 'SectionCV')
p('I build software and AI automations, combining full-stack engineering with experience in accounting and consulting environments. I also offer practical AI training and digital adoption support for individuals and teams.')
p('SELECTED EXPERIENCE', 'SectionCV')
p('<b>Fairvalue Management Consultancy and Chartered Accountants</b><br/>Experience across IT management, software and systems delivery, audit data analysis, cloud migration, security, internal operations and automation.')
p('<b>Independent product and client work</b><br/>Full-stack product development spanning financial tools, transport intelligence, indoor navigation and client storefronts. Work covers problem definition, interface design, implementation and workflow testing.')
p('SELECTED PROJECTS', 'SectionCV')
p('<b>Svika:</b> Transport and trip intelligence product.<br/><b>Muripi:</b> Indoor navigation across web and Android. Physical route validation remains a separate release gate.<br/><b>Taku Payroll:</b> Payroll software with local data and automation. Release readiness remains in progress.<br/><b>Client storefronts:</b> Product discovery and enquiry interfaces, including Bushkin and Taku-cake.')
p('TECHNICAL SKILLS', 'SectionCV')
p('TypeScript, React, Next.js, Node.js, Python, FastAPI, PostgreSQL, Supabase, Convex, Tauri and Rust. AI automation, retrieval-augmented generation and local language-model workflows. Practical work with Codex, Claude and Perplexity.')
p('EDUCATION AND RECOGNITION', 'SectionCV')
p('<b>BSc Computer Information Systems (Honours)</b><br/>Near East University, Cyprus | 2020 | GPA 3.25')
p('<b>Google AI Professional Certificate</b> | March 2026<br/><link href="https://coursera.org/verify/professional-cert/FZSTEM28BXNS">Verify credential: FZSTEM28BXNS</link>')
p('<b>GDG Harare Build with AI 2026 hackathon winner</b><br/>Recorded in my professional portfolio.')
SimpleDocTemplate(str(target), title='Takunda Maswi - CV', author='Takunda Maswi', pagesize=(595.28, 841.89), rightMargin=44, leftMargin=44, topMargin=40, bottomMargin=36).build(story)
print(target)
