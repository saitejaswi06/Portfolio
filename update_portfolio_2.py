import re
from bs4 import BeautifulSoup

with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# Experience Logos
exp_logos = {
    'Coromandel International Limited': 'https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Coromandel_International_logo.svg/1200px-Coromandel_International_logo.svg.png',
    'Robotics Interest Group (RIG)': 'https://media.licdn.com/dms/image/v2/C560BAQF-QOOK8q-Tiw/company-logo_200_200/company-logo_200_200/0/1630652622688/robotics_interest_group_nit_calicut_logo?e=2147483647&v=beta&t=7hW33-4Yn305zXh-jI3rE-J2L4D3lQWq_3s682WcE-E',
    'Edunet Foundation': 'https://edunetfoundation.org/wp-content/uploads/2020/03/edunet-logo.png',
    'Tathva NIT Calicut': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/National_Institute_of_Technology%2C_Calicut_logo.svg/1200px-National_Institute_of_Technology%2C_Calicut_logo.svg.png',
    'Texas Instruments India': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Texas_Instruments_logo.svg/1024px-Texas_Instruments_logo.svg.png'
}

exp_section = soup.find('section', id='experience')
if exp_section:
    exp_items = exp_section.find_all('div', class_='relative float-always animate-on-scroll')
    for item in exp_items:
        title_tag = item.find('h3')
        if not title_tag:
            continue
        title_text = title_tag.text.strip()
        
        # Remove IUAC
        if 'Inter University Accelerator Centre' in title_text:
            item.decompose()
            continue
            
        # Add Logo
        if title_text in exp_logos:
            logo_url = exp_logos[title_text]
            # Create a flex container for title and logo
            title_container = soup.new_tag('div', attrs={'class': 'flex items-center gap-4 mb-2'})
            img = soup.new_tag('img', attrs={'src': logo_url, 'class': 'h-10 object-contain rounded', 'alt': f'{title_text} Logo'})
            
            # Move the existing h3 into the container
            title_tag_copy = BeautifulSoup(str(title_tag), 'html.parser').find('h3')
            title_tag_copy['class'] = [c for c in title_tag_copy['class'] if c != 'mb-1']
            
            title_container.append(img)
            title_container.append(title_tag_copy)
            
            title_tag.replace_with(title_container)

# Education Logos
edu_logos = {
    'National Institute of technology, Calicut': 'https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/National_Institute_of_Technology%2C_Calicut_logo.svg/1200px-National_Institute_of_Technology%2C_Calicut_logo.svg.png',
    'Lakshya International School': 'https://media.licdn.com/dms/image/v2/C560BAQFiM8538rC3-g/company-logo_200_200/company-logo_200_200/0/1630652622688?e=2147483647&v=beta&t=7hW33-4Yn305zXh-jI3rE-J2L4D3lQWq_3s682WcE-E',
    'Aditya Talent School': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_x_q85zXh-jI3rE-J2L4D3lQWq_3s682WcE-E&s'
}

edu_section = soup.find('section', id='education')
if edu_section:
    edu_items = edu_section.find_all('div', class_='relative float-always animate-on-scroll')
    for item in edu_items:
        title_tag = item.find('h3')
        if not title_tag:
            continue
        title_text = title_tag.text.strip()
        
        # Add Logo
        if title_text in edu_logos:
            logo_url = edu_logos[title_text]
            title_container = soup.new_tag('div', attrs={'class': 'flex items-center gap-4 mb-2'})
            img = soup.new_tag('img', attrs={'src': logo_url, 'class': 'h-10 object-contain rounded', 'alt': f'{title_text} Logo'})
            
            title_tag_copy = BeautifulSoup(str(title_tag), 'html.parser').find('h3')
            
            title_container.append(img)
            title_container.append(title_tag_copy)
            
            title_tag.replace_with(title_container)

with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Experience and Education sections updated successfully.")
