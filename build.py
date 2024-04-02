import os
import subprocess
import shutil
import argparse
from jinja2 import FileSystemLoader, Environment, select_autoescape

THIS_DIR = os.path.abspath(os.path.dirname(__file__))
TEMPLATE_PATH = os.path.join(THIS_DIR, "templates")
SITE_PATH = os.path.join(TEMPLATE_PATH, "site")
TUTORIALS_PATH = os.path.join(THIS_DIR, "marble-tutorials")


def filter_site_templates(template, extensions=("js", "html")):
    abs_filepath = os.path.join(TEMPLATE_PATH, template)
    basename = os.path.basename(template)
    return (
        SITE_PATH == os.path.commonpath((abs_filepath, SITE_PATH))
        and "." in basename
        and basename.rsplit(".", 1)[1] in extensions
    )


def build_tutorials(build_directory, clean=False):
    if clean:
        subprocess.run(
            [
                "jupyter-book",
                "clean",
                "--all",
                os.path.join(TUTORIALS_PATH, "tutorials"),
            ],
            check=True,
        )
    subprocess.run(
        [
            "jupyter-book",
            "build",
            os.path.join(TUTORIALS_PATH, "tutorials"),
        ],
        check=True,
    )
    tutorials_html_dir = os.path.join(build_directory, "tutorials")
    shutil.rmtree(tutorials_html_dir, ignore_errors=True)
    shutil.move(
        os.path.join(TUTORIALS_PATH, "tutorials", "_build", "html"), tutorials_html_dir
    )


def build(build_directory, node_registry_url, clean=False):
    if clean:
        shutil.rmtree(build_directory, ignore_errors=True)
    env = Environment(
        loader=FileSystemLoader(TEMPLATE_PATH),
        autoescape=select_autoescape(enabled_extensions=("html", "js", "css")),
    )

    shutil.copytree(
        os.path.join(THIS_DIR, "static"), build_directory, dirs_exist_ok=True
    )

    for template in env.list_templates(filter_func=filter_site_templates):
        build_destination = os.path.join(
            build_directory,
            os.path.relpath(os.path.join(TEMPLATE_PATH, template), SITE_PATH),
        )
        os.makedirs(os.path.dirname(build_destination), exist_ok=True)
        with open(build_destination, "w") as f:
            f.write(
                env.get_template(template).render(node_registry_url=node_registry_url)
            )
    build_tutorials(build_directory, clean)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-u",
        "--node-registry-url",
        default="https://raw.githubusercontent.com/"
        "DACCS-Climate/Marble-node-registry/current-registry/node_registry.json",
        help="node registry URL",
    )
    parser.add_argument(
        "-b",
        "--build-directory",
        type=lambda d: os.path.abspath(d),
        default=os.path.join(THIS_DIR, "build"),
        help="location on disk to write built templates to.",
    )
    parser.add_argument(
        "-c",
        "--clean",
        action="store_true",
        help="clean build directories before building.",
    )
    args = parser.parse_args()
    build(args.build_directory, args.node_registry_url, args.clean)
