import * as core from '@actions/core'
import * as exec from '@actions/exec'

/**
 * The main function for the action.
 *
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  try {
    const world = core.getInput('world')
    const num_gens = core.getInput('num_gens')

    // Download the fuzzer
    await exec.exec(
      'curl -L -o fuzz.py https://raw.githubusercontent.com/Eijebong/Archipelago-fuzzer/refs/heads/main/fuzz.py'
    )

    // Run the fuzzer
    core.info(`Fuzzing world ${world} ${num_gens} times...`)
    await exec.exec('python3 fuzz.py -n 1 -r', [num_gens, '-g', world])
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
