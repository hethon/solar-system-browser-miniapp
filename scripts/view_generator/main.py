from jinja2 import Environment, FileSystemLoader
from planets import (
    earth, 
    jupiter, 
    mars, 
    mercury, 
    neptune, 
    saturn, 
    sun, 
    uranus, 
    venus
)


planets = [
    earth.earth, 
    jupiter.jupiter, 
    mars.mars, 
    mercury.mercury, 
    neptune.neptune, 
    saturn.saturn,
    sun.sun,
    uranus.uranus,
    venus.venus,
]


def main():
    environment = Environment(loader=FileSystemLoader("./templates"))
    template = environment.get_template("detail.html")
    
    for planet in planets:
        content = template.render(planet=planet, enumerate=enumerate)
        with open(f"../../src/views/{planet['name']}.html", mode="w", encoding="utf-8") as f:
            f.write(content)

if __name__ == "__main__":
	main()
