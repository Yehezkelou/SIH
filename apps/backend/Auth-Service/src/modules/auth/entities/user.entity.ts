import * as typeorm from "typeorm";
import { Genre, MfaMethod, PersonnelType, UserStatus } from "./auth.enum";
import { UserRole } from "./userRole.entity";
import { RefreshToken } from "./refreshToken.entity";

/**
 * Entité User (compte du personnel hospitalier)
 *
 * Représente le compte de connexion d'un agent : médecin, infirmier,
 * agent d'admission, secrétaire médicale, administrateur, etc.
 * C'est l'identité "employé" du SIH — à ne pas confondre avec le Patient
 * (Patient-Identity-Service), qui est l'identité "soigné".
 */
@typeorm.Entity("users")
export class User {

    // Identifiant technique interne (clé primaire)
    @typeorm.PrimaryGeneratedColumn("uuid")
    id!: string;

    // Matricule / identifiant RH métier, unique, utilisé au quotidien
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true, nullable: false })
    matricule!: string;

    // ===== Identité civile =====
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar" })
    nom!: string;

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar" })
    prenom!: string;

    @typeorm.Column({ type: "enum", enum: Genre, nullable: true })
    genre?: Genre;

    // ===== Identifiants de connexion =====

    // Email professionnel : sert d'identifiant de connexion principal
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true, nullable: false })
    email!: string;

    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    telephone?: string;

    // Empreinte bcrypt/argon2 du mot de passe.
    @typeorm.Column({ length: 255, type: "varchar", nullable: true, select: false })
    passwordHash?: string;

    // Date du dernier changement de mot de passe (politique d'expiration)
    @typeorm.Column({ type: "timestamp", nullable: true })
    passwordChangedAt?: Date;

    // Force l'utilisateur à changer son mot de passe à la prochaine connexion
    @typeorm.Column({ type: "boolean", default: false })
    mustChangePassword!: boolean;

    // ===== Profil métier =====
    @typeorm.Index()
    @typeorm.Column({ type: "enum", enum: PersonnelType, default: PersonnelType.AUTRE })
    personnelType!: PersonnelType;

    // Spécialité (pour les médecins) : cardiologie, pédiatrie...
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    specialite?: string;

    // Numéro d'ordre / RPPS / ADELI du praticien
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", unique: true, nullable: true })
    numeroOrdre?: string;

    // Service / département d'affectation (ex: URGENCES, CARDIOLOGIE, ADMISSION)
    @typeorm.Index()
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    serviceAffectation?: string;

    // ===== Statut & sécurité du compte =====
    @typeorm.Index()
    @typeorm.Column({ type: "enum", enum: UserStatus, default: UserStatus.EN_ATTENTE_ACTIVATION })
    status!: UserStatus;

    // Compteur d'échecs de connexion consécutifs (remis à 0 après un succès)
    @typeorm.Column({ type: "integer", default: 0 })
    failedLoginAttempts!: number;

    // Date jusqu'à laquelle le compte est verrouillé automatiquement
    @typeorm.Column({ type: "timestamp", nullable: true })
    lockedUntil?: Date;

    // Date/IP de la dernière connexion réussie
    @typeorm.Column({ type: "timestamp", nullable: true })
    lastLoginAt?: Date;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    lastLoginIp?: string;

    // ===== Double authentification (MFA) =====
    @typeorm.Column({ type: "boolean", default: false })
    mfaEnabled!: boolean;

    @typeorm.Column({ type: "enum", enum: MfaMethod, default: MfaMethod.NONE })
    mfaMethod!: MfaMethod;

    // Secret TOTP chiffré.
    @typeorm.Column({ length: 255, type: "varchar", nullable: true, select: false })
    mfaSecret?: string;

    // ===== Authentification Rapide par Code PIN (6 chiffres) =====
    @typeorm.Column({ type: "boolean", default: false })
    pinEnabled!: boolean;

    // Empreinte bcrypt/argon2 du code PIN 6 chiffres (JAMAIS en clair).
    @typeorm.Column({ length: 255, type: "varchar", nullable: true, select: false })
    pinHash?: string;

    // Compteur d'échecs de saisie du PIN (sécurité anti-brute force)
    @typeorm.Column({ type: "integer", default: 0 })
    failedPinAttempts!: number;

    // Date de verrouillage temporaire du PIN
    @typeorm.Column({ type: "timestamp", nullable: true })
    pinLockedUntil?: Date;

    // ===== Relations RBAC / sessions =====
    @typeorm.OneToMany(() => UserRole, (userRole) => userRole.user)
    userRoles?: typeorm.Relation<UserRole[]>;

    @typeorm.OneToMany(() => RefreshToken, (token) => token.user)
    refreshTokens?: typeorm.Relation<RefreshToken[]>;

    @typeorm.OneToMany("UserDocument", "user")
    documents?: any[];

    // ===== Métadonnées système =====
    @typeorm.CreateDateColumn()
    createdAt!: Date;

    @typeorm.UpdateDateColumn()
    updatedAt!: Date;

    // Compte administrateur ayant créé cet utilisateur
    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    createdBy?: string;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    updatedBy?: string;

    // Suppression douce
    @typeorm.DeleteDateColumn()
    deletedAt?: Date;

    @typeorm.Column({ length: 255, type: "varchar", nullable: true })
    deletedBy?: string;
}
