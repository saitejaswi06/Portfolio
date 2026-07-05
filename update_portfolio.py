import re
from bs4 import BeautifulSoup

with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# 1. Update Skill Cards
skills_section = soup.find('section', id='skills')
if skills_section:
    skills_grids = skills_section.find_all('div', class_='grid')
    for grid in skills_grids:
        skill_cards = grid.find_all('div', class_='skill-card')
        for card in skill_cards:
            img_or_icon = card.find(['img', 'i', 'svg'])
            title_el = card.find('h3')
            if not title_el:
                continue
            title = title_el.text.strip()
            desc = card.get('data-description', '')
            
            # Create new inner structure
            card.clear()
            
            inner = soup.new_tag('div', attrs={'class': 'skill-card-inner'})
            front = soup.new_tag('div', attrs={'class': 'skill-card-front glassmorphism flex flex-col justify-center items-center p-6 neon-hover'})
            if img_or_icon:
                front.append(img_or_icon)
            new_title = soup.new_tag('h3', attrs={'class': 'text-xl font-semibold text-gray-900 dark:text-gray-100 mt-2 text-center'})
            new_title.string = title
            front.append(new_title)
            
            back = soup.new_tag('div', attrs={'class': 'skill-card-back glassmorphism flex flex-col justify-center items-center p-4'})
            desc_p = soup.new_tag('p', attrs={'class': 'text-sm text-gray-800 dark:text-gray-200'})
            desc_p.string = desc
            back.append(desc_p)
            
            inner.append(front)
            inner.append(back)
            card.append(inner)
            
            # Update classes
            card['class'] = [c for c in card['class'] if c not in ['glassmorphism', 'neon-hover', 'p-6']]

    # Add ISWDP skills to the first grid
    if skills_grids:
        first_grid = skills_grids[0]
        new_skills = [
            ("Sentaurus TCAD", "Proficient in Sentaurus TCAD for 2D/3D semiconductor device modeling and simulation.", "https://skillicons.dev/icons?i=linux"),
            ("2D/3D Device Modeling", "Experience in structuring and analyzing complex semiconductor architectures in TCAD environments.", "fas fa-microchip text-6xl text-blue-500 mb-4 skill-icon")
        ]

        for idx, (title, desc, icon) in enumerate(new_skills):
            new_card = soup.new_tag('div', attrs={'class': 'skill-card rounded-lg shadow-lg card-effect animated-skill-card animate-on-scroll', 'style': f'--delay: {2.0 + idx*0.1}s', 'data-type': 'skill', 'data-title': title, 'data-description': desc})
            inner = soup.new_tag('div', attrs={'class': 'skill-card-inner'})
            front = soup.new_tag('div', attrs={'class': 'skill-card-front glassmorphism flex flex-col justify-center items-center p-6 neon-hover'})
            
            if icon.startswith('http'):
                img = soup.new_tag('img', attrs={'src': icon, 'class': 'h-12 mx-auto mb-4 skill-icon'})
                front.append(img)
            else:
                i_tag = soup.new_tag('i', attrs={'class': icon})
                front.append(i_tag)
                
            t_tag = soup.new_tag('h3', attrs={'class': 'text-xl font-semibold text-gray-900 dark:text-gray-100 mt-2 text-center'})
            t_tag.string = title
            front.append(t_tag)
            
            back = soup.new_tag('div', attrs={'class': 'skill-card-back glassmorphism flex flex-col justify-center items-center p-4'})
            desc_p = soup.new_tag('p', attrs={'class': 'text-sm text-gray-800 dark:text-gray-200'})
            desc_p.string = desc
            back.append(desc_p)
            
            inner.append(front)
            inner.append(back)
            new_card.append(inner)
            first_grid.append(new_card)

with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Skills section updated successfully.")
