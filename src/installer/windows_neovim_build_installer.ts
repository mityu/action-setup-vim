import {exec} from "@actions/exec";
import {FixedVersion} from "../interfaces";
import {NeovimBuildInstaller} from "./neovim_build_installer";

export class WindowsNeovimBuildInstaller extends NeovimBuildInstaller {
  async install(vimVersion: FixedVersion): Promise<void> {
    const reposPath = await this.cloneVim(vimVersion);
    await exec(
      "powershell.exe",
      ["ci\\build.ps1", "-NoTests"],
      {cwd: reposPath, env: {CONFIGURATION: "MSVC_64"}},
    );
    await exec("make", ["install"], {cwd: reposPath});
  }
}
