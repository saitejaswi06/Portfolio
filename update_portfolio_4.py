import re
from bs4 import BeautifulSoup

with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# Update Certifications Order and Samsung Link
certs_section = soup.find('section', id='certifications')
if certs_section:
    certs_grid = certs_section.find('div', class_='grid')
    if certs_grid:
        certs = certs_grid.find_all('div', class_='project-card')
        
        # Sort logic: find specific certs and order them
        # 1. C/Python/NPTEL basic
        # 2. Digital Design Verilog
        # 3. Samsung ISWDP Fellowship
        
        ordered_certs = []
        samsung_cert = None
        for cert in certs:
            title = cert.get('data-title', '')
            if 'Samsung' in title or 'ISWDP' in title:
                # Update link
                link_tag = cert.find('a')
                if link_tag:
                    link_tag['href'] = 'https://drive.google.com/file/d/12pKXvx4Un9KdM0XdV9AuaYlExCZjqI79/view?usp=drive_link'
                samsung_cert = cert
            else:
                ordered_certs.append(cert)
                
        # Sort existing ordered_certs by a rough difficulty keyword metric if possible, or just push Verilog/Samsung to the end
        def get_diff_score(c):
            t = c.get('data-title', '').lower()
            if 'python' in t or 'c programming' in t or 'joy of computing' in t: return 1
            if 'ai' in t or 'machine learning' in t or 'upskill' in t: return 2
            if 'verilog' in t or 'digital design' in t or 'vlsi' in t: return 3
            return 1
            
        ordered_certs.sort(key=get_diff_score)
        if samsung_cert:
            ordered_certs.append(samsung_cert)
            
        # Re-attach
        certs_grid.clear()
        for idx, cert in enumerate(ordered_certs):
            cert['style'] = f'--delay: {idx*0.1}s'
            certs_grid.append(cert)

# Extracurriculars Section (Add after Certifications)
# Check if it exists first
extra_section = soup.find('section', id='extracurriculars')
if not extra_section:
    new_section = soup.new_tag('section', id='extracurriculars', attrs={'class': 'relative container mx-auto px-6 py-16 rounded-lg shadow-xl glassmorphism my-16 overflow-hidden animate-on-scroll float-always'})
    h2 = soup.new_tag('h2', attrs={'class': 'text-4xl font-bold text-center fira-code text-indigo-600 dark:text-indigo-400 mb-12'})
    h2.string = "Extracurriculars"
    new_section.append(h2)
    
    grid = soup.new_tag('div', attrs={'class': 'grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10'})
    
    extras = [
        ("Taekwondo", "Practiced Taekwondo, developing discipline, physical fitness, and mental focus. Participated in training and sparring sessions, demonstrating perseverance and commitment to continuous improvement.", "fas fa-user-ninja"),
        ("Poster Designing", "Creative poster design for events and college fests using tools like Canva and Adobe Illustrator. Strong eye for aesthetics, typography, and visual communication.", "fas fa-paint-brush"),
        ("Marketing & PR", "Led marketing initiatives and Public Relations for college technical events. Developed outreach strategies, managed team coordination, and executed promotional campaigns.", "fas fa-bullhorn")
    ]
    
    for idx, (title, desc, icon) in enumerate(extras):
        card = soup.new_tag('div', attrs={'class': 'skill-card glassmorphism neon-hover p-6 rounded-lg shadow-lg card-effect animate-on-scroll text-center', 'style': f'--delay: {idx*0.2}s'})
        i_tag = soup.new_tag('i', attrs={'class': f'{icon} text-6xl text-indigo-500 mb-4 inline-block'})
        title_h3 = soup.new_tag('h3', attrs={'class': 'text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3'})
        title_h3.string = title
        desc_p = soup.new_tag('p', attrs={'class': 'text-gray-700 dark:text-gray-300 text-sm'})
        desc_p.string = desc
        
        card.append(i_tag)
        card.append(title_h3)
        card.append(desc_p)
        grid.append(card)
        
    new_section.append(grid)
    
    if certs_section:
        certs_section.insert_after(new_section)

# Update About me
about_section = soup.find('section', id='about')
if about_section:
    paragraphs = about_section.find_all('p')
    if len(paragraphs) >= 3:
        paragraphs[0].clear()
        paragraphs[0].append("I am a 4th-year Electrical and Electronics Engineering student at NIT Calicut with a passion for building reliable hardware systems and bridging the gap between Silicon and Software. My core expertise lies in ")
        strong = soup.new_tag('strong', attrs={'class': 'text-indigo-700 dark:text-indigo-300'})
        strong.string = "embedded systems, digital design (RTL), machine learning, and mixed-signal VLSI"
        paragraphs[0].append(strong)
        paragraphs[0].append(".")
        
        paragraphs[1].clear()
        paragraphs[1].string = "From designing custom Verilog modules for FPGA-based autonomous robots to building full-stack hardware-software integrations for medical rehabilitation, I love taking ideas from concept to real-world implementation. My recent work includes 2D/3D device modeling using Sentaurus TCAD, developing machine learning classifiers for biomedical applications, and migrating critical FPGA firmware."
        
        paragraphs[2].clear()
        paragraphs[2].string = "Beyond engineering, I am a section head and PR lead for Tathva (NIT Calicut's tech fest), a Taekwondo practitioner, and an avid poster designer. I thrive in cross-functional environments where technical rigor meets creative problem solving."


with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Certs, Extras, About Me updated successfully.")
