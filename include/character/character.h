/*
characters - character.h
Created on: Jan 30, 2017

OpenRPG Software License - Version 1.0 - February 10th, 2017 <https://openrpg.io/about/license/>
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.
*/
#ifndef SRC_CHARACTER_H_
#define SRC_CHARACTER_H_

#ifdef _WIN32
#	include "exports/character_exports.h"
#else
#	define CHARACTER_EXPORT
#endif

#include "ability-scores.h"
#include "skills.h"
#include "races.h"

namespace ORPG {
    namespace Characters {
        /**
         * @desc prints the version info when -V or --version is an argument to the command.
         * This adhears to the GNU standard for version printing, and immediately terminates
         * the program with exit code EXIT_SUCCESS
         **/
        void CHARACTER_EXPORT print_version_flag();

        /**
         * @desc prints the help info when -h or --help is an argument to the command.
         * This adhears to the GNU standard for help printing, and immediately terminates
         * the program with exit code EXIT_SUCCESS
         **/
        void CHARACTER_EXPORT print_help_flag();

        /**
         * @desc prints the version info when version, ver, v, or V are called in the ORPG shell.
         * Because this is called from within our ORPG shell, the program will continue running.
         **/
        void CHARACTER_EXPORT print_basic_version();

        /**
         * @desc prints the help info when help, h, or H are called in the ORPG shell.
         * Because this is called from within our ORPG shell, the program will continue running.
         **/
        void CHARACTER_EXPORT print_basic_help();

        /**
         * TODO comments 
         * NOTE(incomingstick): This function is not exported because it does not yet need to be
         **/
        class RaceSelector {
        private:
            struct race_node {
                int raceID;
                bool required;

                race_node* parent;
                std::vector<race_node* > children;
            };

            race_node* head;
            race_node* current;
            race_node* allocate_node(int8 raceID,
                                    bool required,
                                    race_node* parent);
        public:
            RaceSelector();
            ~RaceSelector();

            void reset() { current = head; };
            std::vector<std::string> current_options();
            bool has_options();
            void select_option(int8 index);
            int8 current_id();
        };

        /**
         * @desc Currently this function just checks to ensure the string contains
         * only digits, and returns true. It will return false otherwise.
         * If the provided string is empty, this function returns false.
         * 
         * TODO(incomingstick): ensure we are at least coming in as an int32.
         *
         * NOTE(incomingsting): This could, and probably should, be improved
         * to also ensure we are within the bounds on the "question" being asked.
         * 
         * NOTE(incomingstick): This function is not exported because it does not yet need to be
         *
         * @param: string check - this string to be checked
         * @return bool - returns true if check contains only numbers
         **/
        bool safety_check_stoi(std::string check);

        /**
         * @desc This function is built to work in tandem specifically with the Character
         * module. It takes in a CharacterFactory and checks what stage it is
         * currently in, prompting the user for any required input from cin.
         *
         * NOTE(incomingsting): currently, we are only using numbered input
         * (i.e '1') so the above purity check function strictly ensures the input
         * will only contain digits. If it does not, it will continue to prompt the
         * user.
         *
         * @param: CharacterFactory factory - the factory to check and prompt from
         * @return auto - the selected input
         **/
        int request_selection(RaceSelector factory);
        
        /**
         * @desc This function is build to work specifically in tandem with the Character
         * module. It prompts to stdout a request for user input, from stdin, to help determine
         * whether or not we should just randomly create the character
         *
         * TODO character creator switch ('-r' argv should ALSO handle this)
         * 
         * @return bool - true if user wants to be random, false otherwise
         **/
        bool CHARACTER_EXPORT request_is_random();

        /**
         * @desc This function prompts the user for their race by using the RaceSelector
         * to first prompt to stdout the base race, requesting a corresponding number
         * via stdin. It repeats this process for the subrace, and will continue prompting
         * until no other race types could possibly be chosen.
         * 
         * @return auto - the current race ID from the RaceSelector
         **/
        int CHARACTER_EXPORT request_race();

        /**
         * @desc This function prompts the user, via stdout, for 6 numbers to
         * use as their characters abilities. It specifically request their
         * ability scores in the following order: Strength, Dexterity,
         * Constitution, Intelligence, Wisdom, Charisma.
         *
         * NOTE(incomingsting): currently, we are only using numbered input
         * (i.e '12') so the above purity check function strictly ensures the input
         * will only contain digits. If it does not, it will continue to prompt the
         * user.
         *
         * This function could likely also be cleaner. Its just a giant switch
         * currently, which looks kinda ungly, and takes up space. Like this comment.
         *
         * @return AbilityScores - an AbilityScores object containing the users input
         * scores
         **/
        AbilityScores CHARACTER_EXPORT request_scores();

        /**
         * @desc This function prompts the user via stdout for a name, and reading
         * from stdin the input. We use the safeGetline funtion via the Utils
         * library to ensure integrity across platforms.
         * 
         * @return string - the user input string to be used as a name
         **/
        std::string CHARACTER_EXPORT request_name();

        /**
         * @desc prints "Background\n" to stdout
         *
         * TODO(incomingstick): Add backgrounds
         *
         * @return bool - always will return true
         **/
        bool CHARACTER_EXPORT request_background();

        /**
         * @desc prints "Class\n" to stdout
         *
         * TODO(incomingstick): Add character classes
         *
         * @return bool - always will return true
         **/
        bool CHARACTER_EXPORT request_class();

        /**
         * @desc prints "Skill select based on class\n" to stdout
         *
         * TODO(incomingstick): Improve skills once classes are added
         *
         * @return bool - always will return true
         **/
        bool CHARACTER_EXPORT request_skills();

        /**
         * @desc prints "Hit points\n" to stdout
         *
         * TODO(incomingstick): Set hitpoints based on classes hit die
         *
         * @return bool - always will return true
         **/
        bool CHARACTER_EXPORT request_hitpoints();

        /**
         * @desc prints "Equipment\n" to stdout
         *
         * TODO(incomingstick): Choose equipment based on class
         * and background
         *
         * @return bool - always will return true
         **/
        bool CHARACTER_EXPORT request_equipment();
    }

    /* NOTE: These are just the 5E character requirements */

    /* an arrray that holds the EXP needed for each level */
    extern const int CHARACTER_EXPORT levels[];

    enum CHARACTER_EXPORT Alignment {
        LawfulGood, 	NeutralGood, 	ChaoticGood,
        LawfulNeutral, 	TrueNeutral, 	ChaoticNeutral,
        LawfulEvil, 	NeutralEvil, 	ChaoticEvil
    };

    /* An enum containing the list of D&D 5E languages */
    enum CHARACTER_EXPORT Language {
        Common,    Dwarvish,   Elvish,
        Giant,     Gnomish,    Goblin,
        Halfling,  Orc,        Abyssal,
        Celestial, Draconic,   DeepSpeech,
        Infernal,  Primordial, Silvian,
        Undercommon
    };

    /**
     * An enum containing genders
     *
     * NOTE(incomingstick): How far do we want to take this? We could
     * put ourselves in  a tricky place if this is done wrong.
     **/
    enum CHARACTER_EXPORT Gender {
        Male,
        Female,
        Agender
    };

    enum CHARACTER_EXPORT Size {
        Tiny,        // 2½ by 2½ ft.          [under 2 feet tall]
        Small,       // 5 by 5 ft.            [2 to 4 feet tall]
        Medium,      // 5 by 5 ft.            [4 to 8 feet tall]
        Large,       // 10 by 10 ft.          [8 to 12 feet tall]
        Huge,        // 15 by 15 ft.          [12 to 16 feet tall]
        Gatgantuan   // 20 by 20 ft or larger [taller than 16 feet]
    };

    enum CHARACTER_EXPORT VisionType {
        Normal,
        Blindsight,
        DarkVision,
        TrueSight
    };

    struct CHARACTER_EXPORT Vision {
        VisionType type;    // type of sight
        int radius;         // radius of vision in feet (-1 == infinite IF unobstructed)
    };

    /* Generates a stat > 1 && < 20 */
    uint8 CHARACTER_EXPORT gen_stat();

    /* Generates an array of stats > 1 && < 20 */
    std::vector<uint8> CHARACTER_EXPORT ability_score_vector();

    /**
     * returns an integer representation of the passed abilities modifier
     *
     * NOTE(incomingstick): This is intended to always round down. Data loss is acceptable.
     **/
    inline int8 CHARACTER_EXPORT modifier(int abil) { return (abil - 10) / 2; };

    // TODO take an in depth look at what should and should not be public here
    class CHARACTER_EXPORT Character {
    private:
        Race* race;			                // The race of our character
        struct Vision vision;               // information about the characters vision
        size_t age;                         // the age of the character
        Alignment alignment;                // the character alignment
        Size size;                          // the size type
        std::string firstName;              // the characters first name
        std::string lastName;               // the characters first name
        AbilityScores abils;                // struct of ability scores
        Skills skills;                      // struct of skill checks
        int curr_hp;                        // current hit points
        int temp_hp;                        // temporary hit points
        int max_hp;                         // maximum hit points
        int prof;                           // proficiency bonus
        int level;                          // character level total
        int cur_exp;                        // current experience
        int max_exp;                        // experience needed for next level
        std::vector<Language> languages;    // the array of known languages
        Gender gender;                      // the characters gender

        void Initialize();

    public:
        Character(const int raceID = -1,
                  AbilityScores ab = AbilityScores(),
                  std::string name = "");
        ~Character();

        std::string format_mod(int mod, int spaces);

        void update_skills();

        // an integer that represents the Character
        // NOTE(incomingstick): this is the same ID as a generic Race...
        static const int8 ID = 0x0000;

        // Returns a copy of our Ability abils struct
        AbilityScores get_ability_copy() { return abils; };

        // Returns a copy of our Skills skills struct
        // NOTE(var_username): Commented out because I broke it
        // Skills get_skills_copy() { return skills; };

        /* accessor functions for ability score modifiers */
        int8 STR() { return abils.getScore(EnumAbilityScore::STR); };
        int8 DEX() { return abils.getScore(EnumAbilityScore::DEX); };
        int8 CON() { return abils.getScore(EnumAbilityScore::CON); };
        int8 INT() { return abils.getScore(EnumAbilityScore::INT); };
        int8 WIS() { return abils.getScore(EnumAbilityScore::WIS); };
        int8 CHA() { return abils.getScore(EnumAbilityScore::CHA); };

        /* accessor functions for ability score modifiers */
        int8 STR_MOD() { return abils.getMod(EnumAbilityScore::STR); };
        int8 DEX_MOD() { return abils.getMod(EnumAbilityScore::DEX); };
        int8 CON_MOD() { return abils.getMod(EnumAbilityScore::CON); };
        int8 INT_MOD() { return abils.getMod(EnumAbilityScore::INT); };
        int8 WIS_MOD() { return abils.getMod(EnumAbilityScore::WIS); };
        int8 CHA_MOD() { return abils.getMod(EnumAbilityScore::CHA); };

        /* accessor functions for ability score saves */
        int8 STR_SAVE() { return modifier(abils.getSave(EnumAbilityScore::STR)); };
        int8 DEX_SAVE() { return modifier(abils.getSave(EnumAbilityScore::DEX)); };
        int8 CON_SAVE() { return modifier(abils.getSave(EnumAbilityScore::CON)); };
        int8 INT_SAVE() { return modifier(abils.getSave(EnumAbilityScore::INT)); };
        int8 WIS_SAVE() { return modifier(abils.getSave(EnumAbilityScore::WIS)); };
        int8 CHA_SAVE() { return modifier(abils.getSave(EnumAbilityScore::CHA)); };

        // allows quick conversion of a skill for its passive check
        int8 passive_stat(int mod) { return 8 + prof + mod; };

        std::string to_string();
        std::string to_ascii_sheet();
    };
}

#endif /* CHARACTER_H_ */
