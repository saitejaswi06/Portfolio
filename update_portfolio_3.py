import re
from bs4 import BeautifulSoup

with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

soup = BeautifulSoup(html_content, 'html.parser')

# 3. Projects Section Updates
projects_section = soup.find('section', id='projects')
if projects_section:
    projects_grid = projects_section.find('div', class_='grid')
    
    # New Projects Data
    new_projects = [
        {
            "title": "EMG-Based Rehabilitation Gaming System",
            "brief": "An EMG-based rehabilitation platform for upper-limb gesture training using surface EMG acquisition and ML.",
            "full": "Developed an EMG-based rehabilitation platform for upper-limb gesture training using surface EMG acquisition, signal conditioning, and real-time feedback.$$Implemented feature extraction (RMS, MAV, statistical features) and KNN-based gesture classification for flexion, extension, and rest-state recognition using Python and ESP32.",
            "tech": "ESP32, Signal Processing, Machine Learning, Python",
            "link": "https://github.com/saitejaswi06/EMG-Rehabilitation",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Surface_EMG.png/800px-Surface_EMG.png"
        },
        {
            "title": "FPGA-Based MazeSolver Bot",
            "brief": "Autonomous MazeSolver robot designed for intelligent warehouse navigation and environmental monitoring.",
            "full": "Developed FPGA-based control logic for an autonomous MazeSolver robot as part of the e-Yantra Robotics Competition, progressing through Stage-2 implementation.$$Designed and verified Verilog HDL modules for sensor interfacing, navigation logic, decision-making, and real-time maze-solving operations.",
            "tech": "Verilog HDL, FPGA, Digital Design",
            "link": "https://github.com/saitejaswi06/MazeSolver-FPGA",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Maze_solver_robot.jpg/800px-Maze_solver_robot.jpg"
        },
        {
            "title": "8-Bit ALU Design",
            "brief": "An 8-bit Arithmetic Logic Unit capable of performing eight distinct operations using Verilog HDL.",
            "full": "Designed an 8-bit ALU using concepts of opcodes, inputs, and circuits to perform eight different arithmetic and logic operations.$$Simulated and synthesized the design using Xilinx Vivado to verify functionality and timing constraints.",
            "tech": "Verilog HDL, Digital Logic Design, Xilinx Vivado",
            "link": "https://github.com/saitejaswi06/8-bit-ALU",
            "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/ALU_symbol.svg/800px-ALU_symbol.svg.png"
        }
    ]
    
    # Create and insert new projects
    for proj in new_projects:
        card = soup.new_tag('div', attrs={
            'class': 'project-card glassmorphism neon-hover rounded-lg shadow-lg overflow-hidden card-effect group float-always animate-on-scroll',
            'data-type': 'project',
            'data-title': proj['title'],
            'data-brief-description': proj['brief'],
            'data-full-description': proj['full'],
            'data-technologies': proj['tech'],
            'data-github-link': proj['link']
        })
        
        # Image container
        img_container = soup.new_tag('div', attrs={'class': 'project-image-container relative overflow-hidden bg-white'})
        img = soup.new_tag('img', attrs={
            'src': proj['img'],
            'alt': f"{proj['title']} Image",
            'class': 'w-full h-56 object-cover transform scale-100 transition-transform duration-500 group-hover:scale-105'
        })
        overlay = soup.new_tag('div', attrs={'class': 'absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'})
        overlay_span = soup.new_tag('span', attrs={'class': 'text-white text-xl font-bold'})
        overlay_span.string = "View Details"
        overlay.append(overlay_span)
        img_container.append(img)
        img_container.append(overlay)
        
        # Content container
        content = soup.new_tag('div', attrs={'class': 'p-6'})
        title_h3 = soup.new_tag('h3', attrs={'class': 'text-2xl font-bold fira-code text-indigo-700 dark:text-indigo-300 mb-3'})
        title_h3.string = proj['title']
        
        desc_p = soup.new_tag('p', attrs={'class': 'text-gray-700 dark:text-gray-300 mb-4 text-sm'})
        desc_p.string = proj['brief']
        
        tech_div = soup.new_tag('div', attrs={'class': 'flex flex-wrap gap-2 text-sm mb-4'})
        for tech in proj['tech'].split(','):
            span = soup.new_tag('span', attrs={'class': 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full'})
            span.string = tech.strip()
            tech_div.append(span)
            
        link_div = soup.new_tag('div', attrs={'class': 'flex justify-between items-center'})
        a_tag = soup.new_tag('a', attrs={
            'href': proj['link'],
            'class': 'btn-primary text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:text-gray-300',
            'target': '_blank',
            'rel': 'noopener noreferrer'
        })
        i_tag = soup.new_tag('i', attrs={'class': 'fab fa-github mr-2'})
        a_tag.append(i_tag)
        a_tag.append(" GitHub")
        link_div.append(a_tag)
        
        content.append(title_h3)
        content.append(desc_p)
        content.append(tech_div)
        content.append(link_div)
        
        card.append(img_container)
        card.append(content)
        
        # Insert at the beginning
        projects_grid.insert(0, card)


with open('/Users/saitejaswiuppuluri/Desktop/Portfolio/index.html', 'w', encoding='utf-8') as f:
    f.write(str(soup))
print("Projects updated successfully.")
